import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

type DynamicSearchProp<T extends Record<string, unknown>> = {
  placeholder: string;
  searchData: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  index: keyof T;
};
export default function DynamicSearch<T extends Record<string, unknown>>({
  placeholder,
  searchData,
  setData,
  index,
}: DynamicSearchProp<T>) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchResult = searchData.filter((item) => {
      if (typeof item[index] === "string") {
        return item[index]
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase());
      }
      return false;
    });
    setData(searchResult);
  };

  return (
    <div className="relative">
      <div className="pr-2 border-r border-gray-300 absolute top-[10px] left-[8px]">
        <Search size={15} />
      </div>
      <Input
        onChange={handleSearch}
        placeholder={placeholder}
        className="px-[2.7rem]"
      />
    </div>
  );
}
