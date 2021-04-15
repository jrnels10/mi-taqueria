
import './Toggle.scss';
export const Toggle = ({ toggleState, toggleAction }) => {
    return <label className="switch">
        <input type="checkbox" checked={toggleState} onChange={toggleAction} />
        <span className="slider round"></span>
    </label>
}