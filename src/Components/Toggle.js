
import './Toggle.scss';
export const Toggle = ({ toggleState, toggleAction }) => {
    return <label className="switch">
        <input type="checkbox" checked={toggleState} onChange={toggleAction} />
        <span className="slider round"></span>
    </label>
};

export const ToggleDrag = ({ toggleState, disabled, setToggleDisabled, toggleAction, customClassName = '' }) => {
    const handlePointer = e => e.movementX > 1 ?
        toggleAction(true) :
        e.movementX < -1 ?
            toggleAction(false) :
            null;
    return <label className={`switch switch${disabled ? '--disabled' : ''} ${customClassName}`} onClick={() => setToggleDisabled(!disabled)}>
        {!disabled ? <div className={`toggleDrag toggleDrag${toggleState ? '--checked' : ''}`} draggable="true" onPointerMove={handlePointer} /> : null}
        <span className="slider round"></span>
    </label>
}