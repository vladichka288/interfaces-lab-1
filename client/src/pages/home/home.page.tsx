import { Observer } from "mobx-react-lite";
import { memo } from "react";
import { Modal } from "../../components/modal/Modal";
import ioc from "../../ioc";
import { HomeBLoC } from "./home.bloc";
import logo from "./../../assets/logo.webp";
import "../../styles/home.css";
export type HomeProps = {};
export const HomePage = memo<HomeProps>((props) => {
  const bloc = ioc.useBLoC2(HomeBLoC, props);

  return (
    <Observer>
      {() => (
        <div className="home-wrapper">
          <img src={logo} className="home-logo" />
          <h1>Introducing Our Contact Management App</h1>

          <h1>Key Features:</h1>
          <ol>
            <li>Contact Recording: </li>
            <p>
              Quickly capture and store contact information with just a few
              taps. Easily input details such as name, phone number, email
              address, and additional notes.
            </p>

            <li>Contact Editing: </li>
            <p>
              Make updates and modifications to your existing contacts whenever
              needed. Whether it's correcting a typo or updating a phone number,
              our app provides a seamless editing experience.
            </p>

            <li>Contact Deletion: </li>
            <p>
              Remove unwanted or outdated contacts from your list effortlessly.
              Simply select the contact you wish to delete, confirm your action,
              and the contact will be removed permanently.
            </p>

            <li>Number Addition: </li>
            <p>
              Need to add additional phone numbers to a contact? Our app allows
              you to conveniently add multiple numbers to a single contact
              entry, ensuring all relevant contact information is in one place.
            </p>

            <li>Sorting and Organization: </li>
            <p>
              Easily sort your contacts based on various criteria, such as name,
              phone number, or email address. This feature enables you to
              quickly locate specific contacts and maintain an organized contact
              list.
            </p>
          </ol>

          <p>
            Experience the convenience and efficiency of our contact management
            app. Stay connected and effortlessly manage your contacts with ease.
            Download our app now and take control of your contact list.
          </p>
        </div>
      )}
    </Observer>
  );
});
