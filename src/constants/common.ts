export function formatToVND(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid input: amount must be a number.')
  }

  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND') // Thay thế ký hiệu ₫ bằng VND nếu cần
}
