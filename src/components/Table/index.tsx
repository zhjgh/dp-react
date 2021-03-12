
import React, { useEffect, useCallback, useState  } from 'react'
import { Table } from 'antd'
import { ITableProps } from './index.d'

const CommonTable: React.FC<ITableProps> = props => {
  
  const { ownColumns, fetchAction, fetchParams, baseProps } = props
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(null)
  const [dataSource, setDataSource] = useState([])

  // 改变页码
  const handleTableChange = (payload: { current: number, pageSize: number }) => {
    setCurrent(payload?.current)
    setPageSize(payload?.pageSize)
  }

  // pageSize 变化的回调
  const handleShowSizeChange = (current: number, size: number) => {
    setCurrent(current)
    setPageSize(size)
  }

  // useCallback包装请求，缓存依赖，优化组件性能
  const fetchDataWarp = useCallback(fetchData, [current, pageSize])

  // 异步请求数据
  async function fetchData() {
    setLoading(true)
    // @ts-ignore
    const res = await fetchAction({ current, pageSize, ...fetchParams }).catch((err: any) => {
      setLoading(false)
      return err
    })
    setLoading(false)
    if (res.state === 1) {
      const { total, list } = res
      setTotal(total)
      setDataSource(list)
    }
  }

  useEffect(() => {
    fetchDataWarp()
  }, [fetchDataWarp])

  const tableProps = {
    loading,
    dataSource,
    pagination: {
      current,
      pageSize,
      total,
      onShowSizeChange: handleShowSizeChange
    },
    columns: ownColumns(fetchData),
    onChange: handleTableChange,
    ...baseProps
  }

  return (
    <Table {...tableProps} />
  )
}

export default CommonTable
