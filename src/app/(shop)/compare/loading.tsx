import { Skeleton } from "@/components/ui/skeleton";

export default function CompareLoading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-10 w-72 rounded-none" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <colgroup>
            <col style={{ width: "9rem" }} />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            {Array.from({ length: 8 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-border last:border-0">
                <td className="py-5 pr-6 align-top">
                  <Skeleton className="h-3 w-16" />
                </td>
                {Array.from({ length: 3 }).map((_, colIdx) => (
                  <td key={colIdx} className="py-5 px-3 align-top">
                    {rowIdx === 0 ? (
                      <Skeleton className="aspect-[2/3] w-full max-w-[160px] rounded-none" />
                    ) : rowIdx === 7 ? (
                      <Skeleton className="h-10 w-full rounded-none" />
                    ) : (
                      <Skeleton className="h-4 w-3/4" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
