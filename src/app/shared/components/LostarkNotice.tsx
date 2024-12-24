'use client';
import { useGetNoticesQuery } from '../queries/useGetNoticesQuery';
import { SkeletonView } from '../ui/Skeleton';
import { TitleInfoList } from '../ui/TitleInfoList';

const NOTICES_COUNT = 10;

export const LostarkNotice = () => {
  const { data: _notices, isLoading } = useGetNoticesQuery();

  const notices = _notices?.slice(0, NOTICES_COUNT);

  return (
    <TitleInfoList
      title={'로스트아크 공지사항'}
      renderInfoList={() => {
        if (isLoading) {
          return <SkeletonView width="100%" height="20px" gap="4px" length={NOTICES_COUNT} />;
        }
        return (
          <ul className="flex w-full flex-col items-start gap-1">
            {notices?.map((notice) => (
              <li key={notice.Title} className="flex w-full items-center truncate">
                <span className="mr-2 rounded-full bg-gray-100 px-1 text-xs text-gray-500">
                  {notice.Type}
                </span>
                <p className="text-sm">{notice.Title}</p>
              </li>
            ))}
          </ul>
        );
      }}
    ></TitleInfoList>
  );
};
