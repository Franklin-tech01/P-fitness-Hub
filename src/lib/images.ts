function unsplash(id: string, params = "auto=format&fit=crop&w=1600&q=80") {
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

export const IMAGES = {
  hero: unsplash("1534438327276-14e5300c3a48"),
  weights: unsplash("1571902943202-507ec2618e8f"),
  interior: unsplash("1517836357463-d25dfeac3438"),
  training: unsplash("1517637382994-f02da38c6728"),
  gymFloor: unsplash("1583454110551-21f2fa2afe61"),
  dumbbells: unsplash("1571019613454-1cb2f99b2d8b"),
  classSession: unsplash("1540497077202-7c8a3999166f"),
  stretching: unsplash("1594737625785-a6cbdabd333c"),
  coaching: unsplash("1550345332-09e3ac987658"),
  runningMachine: unsplash("1584735175315-9d5df23860e6"),
  strengthTraining: unsplash("1518611012118-696072aa579a"),
  groupClass: unsplash("1546483875-ad9014c88eba"),
};
