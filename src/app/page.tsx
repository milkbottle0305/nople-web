import { TitleInfoList } from '@/app/shared/components/TitleInfoList';

export default function Home() {
  const infoList = [
    <p key="0" className="w-36 text-sm truncate">
      로스트아크 공지사항 1234
    </p>,
    <p key="1" className="w-36 text-sm truncate">
      로스트아크 공지사항 1234
    </p>,
    <p key="2" className="w-36 text-sm truncate">
      로스트아크 공지사항 1234 로스트아크 공지사항 1234 로스트아크 공지사항 1234
    </p>,
  ];
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <TitleInfoList
        title="Title"
        renderInfoList={() => (
          <ul className="flex flex-col items-start gap-1">
            {infoList.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}
