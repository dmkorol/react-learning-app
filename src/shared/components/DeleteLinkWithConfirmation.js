import React, {useState} from 'react';
import ConfirmWindow from "./ConfirmWindow";

function DeleteLinkWithConfirmation({title, actionFn}) {
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
            {isModalShown && <ConfirmWindow
                color="danger"
                buttonPrimaryTitle="Delete"
                onHide={() => showModal(false)}
                onConfirm={runConfirmedAction}/>}
        </>
    );
}

export default DeleteLinkWithConfirmation;
