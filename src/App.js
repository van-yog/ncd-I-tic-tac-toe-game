/* eslint-disable no-undef */
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import SignIn from "./components/SignIn";
import "./style.css";
import Field from "./components/Field";
import Spinner from "./components/Spinner";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [steps, setSteps] = useState([]);
  const [activeField, setActiveField] = useState(undefined);
  const [winner, setWinner] = useState("No winner");
  const [endGame, setEndGame] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setSteps(await contract.showAllSteps());
  }, []);

  useEffect(async () => {
    try {
      const winner = await contract.checkWinner();
      setWinner(winner);
      if (winner !== "No winner") {
        setEndGame(true);
        console.log("set END GAME: true");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [steps]);

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Tic-Tac-Toe");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const handClickApprove = async () => {
    if (activeField === undefined) return;
    setLoading(true);

    await contract.addStep(
      { number: activeField },
      BOATLOAD_OF_GAS,
      Big("0")
        .times(10 ** 24)
        .toFixed()
    );

    setSteps(await contract.showAllSteps());
  };

  const handleNewGame = async () => {
    setLoading(true);

    await contract.newGame();
    setSteps(await contract.showAllSteps());
    setActiveField(undefined);
    setEndGame(false);
  };

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe : NEAR GAME</h1>
      </header>
      {currentUser ? (
        <>
          <button onClick={signOut}>Log out</button>
          <div className="game">
            <Field
              steps={steps}
              activeField={activeField}
              setActiveField={setActiveField}
              className={`${endGame && "end-game"}`}
              loading={loading}
            />

            <div className="control-button">
              <button onClick={handleNewGame}>New game</button>
              {endGame && <div>{winner}</div>}
              <button onClick={handClickApprove} disabled={endGame}>
                Approve move
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={signIn}>Log in</button>
          <SignIn />
        </>
      )}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addStep: PropTypes.func.isRequired,
    showAllSteps: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired,
    checkWinner: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
