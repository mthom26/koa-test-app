const users = [
  {
    id: '1',
    name: 'Johnny',
    bio: 'Donec suscipit dui scelerisque, sagittis dui id, finibus nunc. Pellentesque vulputate ipsum id mauris mollis vestibulum. In hac.'
  },
  {
    id: '2',
    name: 'Bob',
    bio: 'Proin ligula nisi, gravida blandit nulla sed, eleifend ullamcorper ante. Praesent a mi libero. Cras tincidunt magna id.'
  },
  {
    id: '3',
    name: 'Alan',
    bio: 'Etiam ipsum magna, vehicula ut libero ut, vestibulum suscipit purus. Duis euismod lacus ac est accumsan, gravida mollis.'
  }
];

module.exports = {
  getUsers: () => {
    return users;
  },
  getUser: (id) => {
    return users.find(user => user.id === id);
  },
  postUser: (newUser) => {
    newUser.id = (users.length + 1).toString();
    users.push(newUser);
    return this.getUser(newUser.id);
  }
}