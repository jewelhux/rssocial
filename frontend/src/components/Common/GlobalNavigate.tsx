import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

export let globalNavigate: NavigateFunction;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();

  return null;
};
