module.exports = function Home(props) {
  return `Home - ${props}`;
};

module.exports.getProps = async function getProps() {
  return 'GetProps';
};
