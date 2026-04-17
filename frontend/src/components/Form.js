import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.last_name.value = onEdit.last_name;
      user.age.value = onEdit.age;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.last_name.value ||
      !user.age.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      console.log("editando")
      await axios
        .put("http://localhost:8800/api/users/" + onEdit.id, {
          name: user.name.value,
          last_name: user.last_name.value,
          age: user.age.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      console.log("salvando")
      await axios
        .post("http://localhost:8800/api/users", {
          name: user.name.value,
          last_name: user.last_name.value,
          age: user.age.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.last_name.value = "";
    user.age.value = "";
    
    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Sobrenome</Label>
        <Input name="last_name" />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input name="age" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
