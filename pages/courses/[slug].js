import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  return (
    <>
      <div className='py-4'>
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  const paths = data.map((course) => ({
    params: { slug: course.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((course) => course.slug === params.slug)[0];
  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
