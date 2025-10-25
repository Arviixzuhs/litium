import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { ModalExtension } from './components/ModalExtension'
import { useImageUpload } from '@/components/ImageUploader/providers/ImageUploaderProvider'
import { AppTableActions } from '@/components/AppTable/interfaces/appTable'
import { AutocompleteChip } from '@/components/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { ProductModel, ProductSpecificationModel } from '@/types/productModel'
import { tableColumns, modalInputs } from './data'
import { deleteItem, setTableData, setModalInputs, setTableColumns } from '@/features/appTableSlice'
import { reqCreateProduct, reqDeleteProduct, reqGetProducts, reqUpdateProduct } from './services'

export const AdminProductPage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)
  const { formData, resetFormData, setImages, images } = useImageUpload()

  const loadData = async () => {
    try {
      const response = await reqGetProducts({
        name: debounceValue,
        page: table.currentPage,
        size: table.rowsPerPage,
      })
      dispatch(setTableData(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const itemToUpdate: ProductModel = table.data.find(
      (item) => item.id === table.currentItemToUpdate,
    )
    if (!itemToUpdate || !itemToUpdate.images) return

    setImages(
      itemToUpdate.images?.map((item) => ({
        id: String(item.id),
        imageURL: item.imageURL,
      })),
    )
  }, [table.currentItemToUpdate])

  React.useEffect(() => {
    loadData()
  }, [debounceValue, table.currentPage, table.rowsPerPage])

  React.useEffect(() => {
    dispatch(setModalInputs(modalInputs))
    dispatch(setTableColumns(tableColumns))
  }, [])

  const { categories, suppliers, specifications, ...data } = table.formData
  const tableFormData = {
    ...data,
    supplierIds: (suppliers as AutocompleteChip[])?.map((item) => item.id) || [],
    categoryIds: (categories as AutocompleteChip[])?.map((item) => item.id) || [],
    specifications: (specifications as ProductSpecificationModel[]) || [],
  }

  const tableActions: AppTableActions = {
    create: async () => {
      await reqCreateProduct(tableFormData, formData)
      loadData()
      resetFormData()
      toast.success('Producto creado correctamente')
    },
    delete: async () => {
      await reqDeleteProduct(table.currentItemToDelete)
      dispatch(deleteItem(table.currentItemToDelete))
      toast.success('Producto eliminado correctamente')
    },
    update: async () => {
      const existingURLs = images.filter((img) => !img.file).map((img) => img.imageURL)
      await reqUpdateProduct(table.currentItemToUpdate, tableFormData, formData, existingURLs)
      loadData()
      resetFormData()
      toast.success('Producto actualizado correctamente')
    },
  }

  return <AppTable tableActions={tableActions} modalExtension={<ModalExtension />} />
}
