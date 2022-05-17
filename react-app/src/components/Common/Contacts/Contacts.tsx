import React from 'react';
import classes from "./Contacts.less";

const Contacts = ({contacts}: any) => {
    return (
        <>
            {
                contacts.vk && <p className={classes.LinkParagraph}>
                    <a target="_blank" href={contacts.vk}>VK</a>
                </p>
            }
            {
                contacts.tg && <p className={classes.LinkParagraph}>
                    <a target="_blank" href={contacts.tg}>Telegram</a>
                </p>
            }
            {
                contacts.github && <p className={classes.LinkParagraph}>
                    <a target="_blank" href={contacts.github}>Github</a>
                </p>
            }
            {
                contacts.gitlab && <p className={classes.LinkParagraph}>
                    <a target="_blank" href={contacts.gitlab}>Gitlab</a>
                </p>
            }
        </>
    );
};

export default Contacts;