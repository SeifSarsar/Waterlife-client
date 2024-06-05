export enum Captain {
  Always = 'Always',
  Optional = 'Optional',
  Never = 'Never',
  None = 'None',
}

export function CaptainToString(captain: Captain) {
  //Use language
  switch (captain) {
    case Captain.Always:
      return 'Always';
    case Captain.Optional:
      return 'Optional';
    case Captain.Never:
      return 'Never';
  }
}
