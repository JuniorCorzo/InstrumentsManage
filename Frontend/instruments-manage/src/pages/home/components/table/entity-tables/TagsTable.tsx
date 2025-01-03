import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../hook/useUpdateTable";
import { TagsDomain } from "@/interfaces/tags-domain.interface";

const TagsTable = () => {
  const { tags, getFormatTable } = useTags();
  useUpdateTable<TagsDomain>(tags, getFormatTable);
  return <table />;
};

export default TagsTable;
