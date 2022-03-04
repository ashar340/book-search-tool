export function zip<T1, T2>(
  [head1, ...tail1]: T1[],
  [head2, ...tail2]: T2[]
): Array<[T1, T2]> {
  if (tail1.length == 0 && tail2.length == 0) {
    return [[head1, head2]];
  }

  return [[head1, head2], ...zip(tail1, tail2)];
}
