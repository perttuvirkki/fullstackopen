const Header = (props) => {
  console.log("header:", props);
  return (
    <div id="Header">
      <h2>{props.name}</h2>
    </div>
  );
};

const Part = ({ parts }) => {
  console.log("Parts: ", parts);

  return (
    <div id="Part">
      {parts.name} {parts.exercises}
    </div>
  );
};

const Content = ({ course }) => {
  console.log("Content: ", course.parts);

  let sum = course.parts.reduce(function (a, b) {
    return a + b.exercises;
  }, 0);

  return (
    <div id="Content">
      {course.parts.map((course) => (
        <Part key={course.id} parts={course}></Part>
      ))}
      <strong>total of {sum}</strong>
    </div>
  );
};

const Course = (props) => {
  const { courses } = props;

  return (
    <div id="Course">
      <h1>WebCV</h1>
      {courses.map((course) => (
        <div>
          <Header name={course.name} />
          <Content course={course} />
        </div>
      ))}
    </div>
  );
};

export default Course;
