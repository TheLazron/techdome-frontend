interface Blog {
  content: string;
  createdOn: string;
  description: string;
  id: string;
  tags: string[];
  title: string;
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profileUrl: string;
  blogs: Blog[];
}

export { Blog, User };
