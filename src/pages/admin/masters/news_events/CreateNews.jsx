import NewsEventHeader from '@/components/common/NewsEventHeader';
import React from 'react'

export default function CreateNews() {
  return (
    <div className="h-screen">
    <NewsEventHeader page={1} />
    <div className="mb-4 mt-1 flex items-center justify-between">
      <h1 className="text-base font-semibold">News</h1>
      <div className="flex items-center gap-2">
        <Link
          to={""}
          className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-6 text-xs font-semibold text-white hover:bg-hrmblue"
        >
          Publish
        </Link>
      </div>
    </div>
    {loading ? (
      <div className="flex min-h-96 w-full items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
      </div>
    ) : (
      <QueryTable columns={columns} list={"NA"} />
    )}
  </div>
  )
}
