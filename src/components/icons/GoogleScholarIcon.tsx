import type { SVGProps } from 'react';

function GoogleScholarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 6v5l12 6 12-6V6L12 0z" />
    </svg>
  );
}

export default GoogleScholarIcon;
