import { Observer } from "mobx-react-lite";
import { memo, useCallback } from "react";
import ioc from "../../ioc";
import { IContact } from "../../models/contacts.model";
import { ContactsBLoC } from "./contacts.bloc";
import "../../styles/contacts.css";
import { ContactModal } from "../../modals/contact.modal";
export const ContactsPage = memo((props) => {
  const bloc = ioc.useBLoC2(ContactsBLoC, { props });

  return (
    <Observer>
      {() => (
        <>
          <div className="contacts-wrapper">
            {bloc.contacts.map((contact) => (
              <Contact
                key={contact.uid}
                contact={contact}
                onClick={() => (bloc.clickedContact = contact.uid)}
              />
            ))}
            <div
              onClick={() => (bloc.newContact = true)}
              className="contact-container"
            >
              <h2> {"\u002B"} Add Contact</h2>
            </div>
          </div>
          {(bloc.clickedContact || bloc.newContact) && (
            <ContactModal
              onClose={bloc.onModalClose}
              uid={bloc.clickedContact}
              new={bloc.newContact}
            />
          )}
        </>
      )}
    </Observer>
  );
});

export type ContactProps = {
  contact: IContact;
  onClick: (uuid: string) => void;
};
export const Contact = memo(({ contact, onClick }: ContactProps) => {
  return (
    <div className="contact-container" onClick={() => onClick(contact.uid)}>
      <h2>{contact.name}</h2>
      <ul>
        {contact.numbers.map((number) => (
          <li>{number}</li>
        ))}
      </ul>
    </div>
  );
});
