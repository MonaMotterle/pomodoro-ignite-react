import { useContext, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../Home.tsx';
import { CountdownContainer, Separator } from './Countdown.styles.ts';
import { useFormContext } from 'react-hook-form';

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    updateAmountSecondsPassed,
  } = useContext(CyclesContext);
  const { reset } = useFormContext();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          updateAmountSecondsPassed(0);

          clearInterval(interval);
          reset();
        }
        updateAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    reset,
    totalSeconds,
    updateAmountSecondsPassed,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Ignite Timer`;
    }
  }, [activeCycle, minutes, seconds]);
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};
