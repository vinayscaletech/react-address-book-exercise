import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { address: '', firstName: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleAddressChange for example
   */
  const [address, setAddress] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    /** TODO: Fetch addresses based any Australian address
     * - Example URL of API: https://suggest.realestate.com.au/consumer-suggest/suggestions?max=7&type=address&src=homepage-web&query=${city}
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the city to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by any Australian address add personal info and
            done! ????
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <form onSubmit={handleAddressSubmit}>
          <fieldset>
            <legend>???? Find an address</legend>
            <div className="form-row">
              <InputText
                name="address"
                onChange={handleAddressChange}
                value={address}
                placeholder="Ex: 56 Wellington Street"
              />
            </div>
            <Button type="submit">Find</Button>
          </fieldset>
        </form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <form onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend>?????? Add personal info to address</legend>
              <div className="form-row">
                <InputText
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
              </div>
              <div className="form-row">
                <InputText
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </div>
              <Button type="submit">Add to addressbook</Button>
            </fieldset>
          </form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className="error">{error}</div>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
