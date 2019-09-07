import React, { useContext } from 'react';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';
/* Provider */
import { VotesContext } from '../../context';

function Vote() {
  const {
    state: { web3, lobsters, poap },
    actions: { voteLobster },
  } = useContext(VotesContext);
  console.log('TCL: Vote -> lobsters', lobsters);
  console.log('TCL: Vote -> poap', poap);
  console.log('TCL: Vote -> web3', web3);

  if (poap.isLoadingTokens) {
    return (
      <Layout>
        <div className="container">
          <img src={kingOfLobsters} alt="King of Lobsters" className="king-of-lobsters" />
          <div>
            <h2>Cargando tus tokens...</h2>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <img src={kingOfLobsters} alt="King of Lobsters" className="king-of-lobsters" />

        {poap.tokens.length === 0 && (
          <div>
            <h2>Necesitas badges para votar</h2>
            <h3>Buscanos en ETHBoston</h3>
          </div>
        )}

        <div>
          <h2>Elegí tu ganador</h2>
          <h3>Usa tus tokens para votar</h3>
        </div>

        <div className="grid">
          {Object.entries(lobsters).map(([id, lobster]) => (
            <div key={id} className="lobster" onClick={() => voteLobster(id)}>
              <img src={lobster.image} alt="Lobster" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Vote;
