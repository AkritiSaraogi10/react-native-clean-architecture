import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

interface ICSearchbar<T extends { [s: string]: unknown }> {
  list: T[];
  setList: Dispatch<SetStateAction<T[]>>;
}

const CSearchbar = <T extends { [s: string]: unknown }>({ list, setList }: ICSearchbar<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<T[]>(list);

  useEffect(() => {
    setFilteredList(list);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setList(filteredListData());
    } else {
      setList(filteredList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filteredList, setList]);

  const filteredListData = () => {
    return filteredList.filter((item) => {
      return Object.values(item).some((fieldValue: unknown) =>
        fieldValue && fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default CSearchbar;
