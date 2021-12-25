const PROD_API = "https://cs3219-taskb-m4jbzqtwiq-de.a.run.app/api/users";
const DEFAULT_PICTURE = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
const IMAGE_ONERROR = (ev) => {
    ev.target.onerror = null;
    ev.target.src = DEFAULT_PICTURE;
  }

export {PROD_API, DEFAULT_PICTURE, IMAGE_ONERROR};
