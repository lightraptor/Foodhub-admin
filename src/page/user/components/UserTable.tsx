import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { Users } from '@/types'
import { Button } from '@/components/ui/button'
import { Ban, CircleCheckBig } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getRoles, postChangeRoles, putBanUser, putUnbanUser } from '@/apis'
import { toast } from 'react-toastify'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select'

interface roles {
  id: string
  name: string
}

type MenuTableProps = {
  user: Users[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function UserTable({
  user,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: MenuTableProps) {
  const [selectedUser, setSelectedUser] = useState<Users | null>(null)
  const [newRole, setNewRole] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [listRoles, setListRoles] = useState<roles[]>([])

  const handleBanUser = async (id: string) => {
    try {
      const response = await putBanUser({ id })
      if (!response) {
        throw new Error('Cấm thất bại')
      }
      toast.success('Cấm thành công')
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await getRoles()
      if (!response) {
        throw new Error('Lấy vai trò thất bại')
      }
      const data = await response.data
      setListRoles(data)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleUnBanUser = async (id: string) => {
    try {
      const response = await putUnbanUser({ id })
      if (!response) {
        throw new Error('Gỡ cấm thất bại')
      }
      toast.success('Gỡ cấm thành công')
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenRoleDialog = (user: Users) => {
    setSelectedUser(user)
    setNewRole(user.roleName)
    setIsDialogOpen(true)
  }

  const handleChangeRole = async () => {
    if (!selectedUser || !newRole) return
    try {
      const response = await postChangeRoles({ userId: selectedUser.id, roleName: newRole })
      if (!response) {
        throw new Error('Thay đổi vai trò thất bại')
      }
      toast.success('Thay đổi vai trò thành công')
      setIsDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-3'>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên tài khoản</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.roleName}</TableCell>
              <TableCell>
                {item.isBanned ? (
                  <Badge className='bg-red-500 text-white hover:bg-red-400'>Cấm</Badge>
                ) : (
                  <Badge className='bg-green-500 text-white hover:bg-green-400'>Hoạt động</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className='flex flex-row gap-3'>
                  {item.isBanned ? (
                    <Button className='bg-green-600 hover:bg-green-500' onClick={() => handleUnBanUser(item.id)}>
                      <CircleCheckBig className='w-4 h-4' /> Gỡ cấm
                    </Button>
                  ) : (
                    <Button className='bg-red-500 hover:bg-red-400' onClick={() => handleBanUser(item.id)}>
                      <Ban className='w-4 h-4' /> Cấm
                    </Button>
                  )}
                  <Button className='bg-primary hover:bg-primary/90' onClick={() => handleOpenRoleDialog(item)}>
                    Thay vai trò
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thay đổi vai trò</DialogTitle>
          </DialogHeader>
          <Select value={newRole || ''} onValueChange={setNewRole}>
            <SelectTrigger>{newRole ? newRole : 'Vai trò'}</SelectTrigger>
            <SelectContent>
              {listRoles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleChangeRole}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
