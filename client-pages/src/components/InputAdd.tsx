import { useRef, useState } from 'react';

import InputAddStyles from './InputAdd.module.css';


interface IInputAddProps {
  onAdd(value: string): void;
}
export const InputAdd = (props: IInputAddProps) => {
  const inputRef = useRef<HTMLInputElement>(null);


  const [value, setValue] = useState('');


  const handleAdd = () => {
    props.onAdd(value);
    setValue('');
    inputRef.current?.focus();
  }


  return (
    <div className={InputAddStyles.Container}>
      <input
        value={value}
        ref={inputRef}
        className={InputAddStyles.Input}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleAdd} className={InputAddStyles.Button}>
        Adicionar
      </button>
    </div>
  );
}
