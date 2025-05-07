let condition = false;
function Hello({ name, num }) {
  return (
    <>
      <h1>My name is {name}</h1>
      <h2>My age is {num}</h2>
      {condition && <h2>Go to About</h2>}
    </>
  );
}
export default Hello;
