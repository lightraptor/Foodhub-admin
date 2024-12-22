export function formatToVND(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid input: amount must be a number.')
  }

  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND') // Thay thế ký hiệu ₫ bằng VND nếu cần
}

export const formatDateToDDMMYYYY = (date: string): string => {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
