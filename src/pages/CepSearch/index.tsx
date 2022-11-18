import { useState } from 'react';
import ResultCard from 'components/ResultCard';
import axios from 'axios';
import './styles.css';

type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

type FormData = {
  cep: string;
}

const CepSearch = () => {

  const [formData, setFormData] = useState<FormData>({ cep: '' });
  const [address, setAddress] = useState<Address>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data)
      }).catch((error) => {
        setAddress(undefined);
        console.log(error);
      })
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name='cep'
              value={formData?.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        {address &&
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        }

      </div>
    </div>
  );
};

export default CepSearch;
