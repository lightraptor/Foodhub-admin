export type Category = {
  id: string
  name: string
  code: string
  description: string
  inactive: boolean
}
export type Menu = {
  id: string
  menuName: string
  description: string
  inactive: boolean
  sortOrder: number
  imageUrl: string
}

export type Users = {
  id: string
  userName: string
  email: string
  phone: any
}

export type TableItem = {
  id: string
  name: string
  maxCapacity: number
  status: string
  isAvailable: boolean
  areaName: string
}
