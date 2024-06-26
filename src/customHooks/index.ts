import { TAppDispatch } from "../store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
