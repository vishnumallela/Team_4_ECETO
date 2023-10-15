export default function index() {
  return (
    <div>
      Home Page
    </div>
  );
}

export async function getServerSideProps(ctx){


  return {
    props:{
      data:null
    }
  }
}
