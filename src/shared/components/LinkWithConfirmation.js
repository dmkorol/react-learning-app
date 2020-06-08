import React, {useState} from 'react';
import ConfirmWindow from "./ConfirmWindow";

function LinkWithConfirmation({title, actionFn}) {
    title = 'Delete';
    const [isModalShown, showModal] = useState(false);

    const showConfirm = (e) => {
        e.preventDefault();
        showModal(true);
    };

    const runConfirmedAction = () => {
        showModal(false);
        actionFn();
    };

    return (<>
            <a href="#" className="text-danger"
               onClick={showConfirm}>{title}</a>
            {isModalShown && <ConfirmWindow onHide={() => showModal(false)} onDelete={runConfirmedAction}/>}
        </>
    );
}

export default LinkWithConfirmation;
