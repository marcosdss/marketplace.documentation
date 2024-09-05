import React from 'react';

const TagsList = ({ tags }) => (
  <div>
    <h2>Tags</h2>
    <ul>
      {tags.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  </div>
);

export default TagsList;
