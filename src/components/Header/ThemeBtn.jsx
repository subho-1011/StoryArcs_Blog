import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeBtn = () => {
    const { darkMode } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    return (
      <button
        onClick={() => {
          dispatch(toggleTheme(!darkMode));
        }}
        className="inline-block px-4 py-2 rounded-xl"
      >
        {darkMode ? <MdOutlineLightMode size={25} /> : <MdDarkMode size={25} />}
      </button>
    );
};
export default ThemeBtn