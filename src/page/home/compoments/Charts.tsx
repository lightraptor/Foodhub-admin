import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import { DashboardData } from '@/types'
import { fetchDashboard } from '@/apis'

// Dữ liệu từ API (giả định đã fetch thành công)

// Định màu cho biểu đồ - có thể chọn màu bạn thích
const COLORS = ['#0765ff', '#82ca9d']

const chartConfig = {
  visitors: {
    label: 'Percentage'
  }
}

interface ChartProps {
  criteria: string
}

export const Charts = ({ criteria }: ChartProps) => {
  const [data, setData] = useState<DashboardData>()
  const fetchData = async () => {
    try {
      const response = await fetchDashboard({ criteria: criteria })
      const data = response.data
      console.log(data)
      setData(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  const chartDataCategory = data?.productsGroupedByCategory.map((item, index) => ({
    name: item.label,
    value: item.value,
    fill: COLORS[index % COLORS.length] // Dùng màu từ mảng COLORS
  }))

  const chartDataMenu = data?.productsGroupedByMenu.map((item, index) => ({
    name: item.label,
    value: item.value,
    fill: COLORS[index % COLORS.length] // Dùng màu từ mảng COLORS
  }))
  return (
    <>
      <div className='p-20'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>{data?.totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>{data?.totalOrder}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>{data?.totalRevenueAdmount.toLocaleString()} VND</p>
            </CardContent>
          </Card>
        </div>
        <div className='flex flex-row gap-4 p-10 justify-around'>
          {/* Biểu đồ cho danh mục sản phẩm */}
          <Card className='flex flex-col min-w-[400px]'>
            <CardHeader className='items-center pb-0'>
              <CardTitle>Biểu đồ - Danh mục sản phẩm</CardTitle>
              <CardDescription>Theo nhóm danh mục</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie data={chartDataCategory} dataKey='value' nameKey='name' innerRadius={60} />
                  {/* Chart Legend */}
                  <ChartLegend
                    content={chartDataCategory?.map((entry, index) => (
                      <ChartLegendContent key={index} nameKey={entry.name} color={entry.fill} />
                    ))}
                    className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Biểu đồ cho thực đơn */}
          <Card className='flex flex-col min-w-[400px]'>
            <CardHeader className='items-center pb-0'>
              <CardTitle>Biểu đồ - Thực đơn</CardTitle>
              <CardDescription>Theo nhóm thực đơn</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie data={chartDataMenu} dataKey='value' nameKey='name' innerRadius={60} />
                  {/* Chart Legend */}
                  <ChartLegend
                    content={chartDataMenu?.map((entry, index) => (
                      <ChartLegendContent key={index} nameKey={entry.name} color={entry.fill} />
                    ))}
                    className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
