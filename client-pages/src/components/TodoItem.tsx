import { Link } from 'react-router';

import TodoItemStyles from './TodoItem.module.css';


interface ITodoItemProps {
  id: string;
  label: string;
  complete: boolean;

  onRemove(): void;
  onComplete(): void;
}
export const TodoItem = ({ id, label, complete, onComplete, onRemove }: ITodoItemProps) => {
  return (
    <li key={id} className={TodoItemStyles.Item} data-complete={complete}>
      <Link to={`/detalhe/${id}`} className={TodoItemStyles.Text}>
        {label}
      </Link>

      <div className={TodoItemStyles.ButtonsGroup}>
        {!complete && (
          <button onClick={onComplete} className={TodoItemStyles.ButtonComplete}>
            Concluir
          </button>
        )}
        <button onClick={onRemove} className={TodoItemStyles.ButtonRemove}>
          Remover
        </button>
      </div>
    </li>
  );
}
