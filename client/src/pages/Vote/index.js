import React, { useContext, useState } from 'react';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';
import kingOfLobstersSmall from '../../assets/images/king-of-lobsters-small.png';
/* Provider */
import { VotesContext } from '../../context';
import VoteOption from '../../components/VoteOption';
import badge from '../../assets/images/poap-badge.png'

function Vote() {
  const {
    state: { web3, lobsters, poap },
    actions: { voteLobster },
  } = useContext(VotesContext);

  const [state, setState] = useState({selected: null, hasWeb3: true, hasWeb3Logged: true, voted: true});

  const changeSelection = (id) => {
    setState(prevState => {
      return { ...prevState, selected: id }
    });
  }

  const canVote = () => {
    return (state.hasWeb3 && state.hasWeb3Logged && poap.tokens.length > 0)
  }

  console.log('TCL: Vote -> lobsters', lobsters);
  console.log('TCL: Vote -> poap', poap);
  console.log('TCL: Vote -> web3', web3);

 
  if (poap.isLoadingTokens) {
    return (
      <Layout>
        <div className="container">
          <div className="loading-container">
            <img src={kingOfLobstersSmall} alt="King of Lobsters" className="king-of-lobsters" />
            <div>
              <h2>Cargando tus tokens...</h2>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <img src={kingOfLobstersSmall} alt="King of Lobsters" className="king-of-lobsters" />

        { !state.hasWeb3 && 
          (<div className="alert">
            <div>Wanna vote? you need a web3 connection like MetaMask</div>
          </div>)}

        {state.hasWeb3 && !state.hasWeb3Logged &&
          (<div className="alert">
            <div className="alert-text"> 
              You should 
            </div>
            <button className="btn-sm" onClick={() => console.log('Click')}>
              Connect to MetaMask
            </button>
        </div>)}

        {state.hasWeb3 && state.hasWeb3Logged && poap.tokens.length === 0 &&
          (<div className="alert">
            <div>You need POAP tokens to vote. Check with your kickback address or <a href="#">come see us…</a></div>
        </div>)}

        {state.hasWeb3 && state.hasWeb3Logged && state.voted &&
          (<div className="alert">
            <div>You already voted but you can change you vote</div>
        </div>)}

        <div className={"header"}>
          <div>
            <h2 className="title">Elegí tu ganador</h2>
            <h3 className="subtitle">Usa tus tokens para votar</h3>
          </div>
          <div>
            {/* This component should appear only when we have an address */}
            <div className="badge-box">
              <img src={badge} className="poap-badge" />
              <div>{poap.tokens.length} Tokens</div>
            </div>
          </div>
        </div>

        <div className="grid">
          {Object.entries(lobsters).map(([id, lobster]) => (
            <VoteOption key={id} 
              id={id}
              image={lobster.image} 
              // action={() => voteLobster(id)}
              action={changeSelection}
              disabled={!canVote()}
              selected={state.selected == id}
              outFocus={!canVote()} />
          ))}
        </div>
        <div className="intro">
          <button className="btn-pink" onClick={() => console.log('navigate')}>
            VOTE NOW!
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Vote;
