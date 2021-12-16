module.exports = function Profile(props) {
  return `Profile - ${props}`;
};

module.exports.getProps = async function getProps() {
  return 'GetProps';
};
