import { useForm } from "react-hook-form";
import { useState } from "react";
import './App.css';

function App() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nome: "",
      imovel: "",
      salario: "",
      garantia: [] 
    }
  });

  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState("");
  const [cor, setCor] = useState("cor_verde"); 

  function finalizarCadastro(data) {
    const nome = data.nome;
    const salario = Number(data.salario);
    const fiador = data.garantia.includes("fiador");
    const outroImovel = data.garantia.includes("outro_imovel");
    const seguro = data.garantia.includes("seguro");

    const valoresImoveis = {
      apto: salario * 0.3, 
      casa: salario * 0.3,  
      comercial: salario * 0.5 
    };

    const valorImovel = valoresImoveis[data.imovel];

    if (!fiador && !outroImovel && !seguro) {
      setMensagem(`Ops, ${nome} ... Cadastro Não Autorizado. Informe-se com nossos atendentes.`);
      setImagem("semchaves.png");
      setCor("cor_vermelha"); 
      return; 
    }

    setMensagem(`Muito Bem-vindo(a), ${nome}. Cadastro Pré-Aprovado. O valor do imóvel selecionado é: R$ ${valorImovel.toFixed(2)}`);
    setImagem("chaves.png");
    setCor("cor_verde"); 
  }

  function limparForm() {
    setMensagem("");
    setImagem("");
    setCor("cor_verde"); 
    reset({
      nome: "",
      imovel: "",
      salario: "",
      garantia: []
    });
  }

  return (
    <>
      <div className="text__left margin">
        <img src="./casa.png" alt="Logo da Imobiliária" className='logo' />
        <div className='margin'>
          <h1>Imobiliária Avenida</h1>
          <h2>App: Pré-Cadastro de inquilino</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(finalizarCadastro)} onReset={limparForm}>
        <div className="margin">
          <p>
            <label htmlFor="nome">Nome do Inquilino:</label><br />
            <input type="text" id="nome" required {...register("nome")} />
          </p>
          <p>
            <label htmlFor="salario">Salário Atual R$:</label><br />
            <input type="number" id="salario" required {...register("salario")} />
          </p>
          <p>
            <label htmlFor="imovel">Imóvel Desejado:</label><br />
            <select id="imovel" {...register("imovel")} required>
              <option value="">--selecione--</option>
              <option value="apto">Apto Residencial</option>
              <option value="casa">Casa</option>
              <option value="comercial">Imóvel Comercial</option>
            </select>
          </p>
          <p>
            <label>Garantias:</label>
            <input type="checkbox" value="fiador" {...register("garantia")} />
            <label htmlFor="fiador">Fiador</label>
            <input type="checkbox" value="outro_imovel" {...register("garantia")} />
            <label htmlFor="outro_imovel">Outro Imóvel</label>
            <input type="checkbox" value="seguro" {...register("garantia")} />
            <label htmlFor="seguro">Seguro Fiança</label>
          </p>
        </div>
        <input type="submit" value="Verificar Situação" className='btn ' />&nbsp;&nbsp;
        <input type="reset" value="Limpar Dados" className='btn' />
      </form>

      <div className="flex">
        {imagem && <img src={imagem} alt="semchave" className="imgsemchave" />}
        <h2 className={cor}>{mensagem}</h2>
      </div>
    </>
  );
}

export default App;
