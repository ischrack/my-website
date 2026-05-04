// content.js — SINGLE SOURCE OF TRUTH for all text content.
// Edit anything here and all three views (desktop / tablet / mobile) update.

window.SITE_CONTENT = {

  /* ─── IDENTITY ─────────────────────────────────────────── */
  identity: {
    name: 'Ian A. Schrack',
    handle: 'ian_schrack',
    role: 'phd · biomedical_engineering',
    roleLong: 'PhD · Biomedical Engineering · Technology Commercialization Fellow',
    avatar: 'uploads/92108874.jpeg',
  },

  /* ─── ABOUT (terminal hero copy) ───────────────────────── */
  about: {
    paragraphs: [
      "I received my PhD in biomedical engineering from the University of Michigan, where I studied how the immune system plays a role in metastatic progression. I used conventional immunology techniques, biomaterials, and next-generation sequencing technologies to perform these studies.",
      "Prior to this, I was a protein engineer building novel, safer CAR T cells against cancer. In my newest role as a {{Technology Commercialization Fellow}}, I'm exploring the translational side of research — helping University inventors map IP strategy, connecting them with industry, and helping them build and scale startups.",
    ],
    // tokens wrapped in {{...}} get accent treatment in the renderer
  },

  /* ─── LINKS ────────────────────────────────────────────── */
  links: [
    { label: 'github',   href: 'https://github.com/ischrack' },
    { label: 'linkedin', href: 'https://www.linkedin.com/feed/' },
    { label: 'orcid',    href: 'https://orcid.org/0000-0002-6189-2087' },
    { label: 'mail',     href: 'mailto:Schrack.ia@gmail.com' },
  ],

  /* ─── CONTACT (used by contact app, footers) ───────────── */
  contact: {
    blurb: 'Open to collaborations, consulting, or connecting around immunology, bioinformatics, or tech commercialization.',
    rows: [
      { label: 'Email',    val: 'Schrack.ia@gmail.com',         href: 'mailto:Schrack.ia@gmail.com' },
      { label: 'LinkedIn', val: 'linkedin.com/in/ischrack',     href: 'https://www.linkedin.com/feed/' },
      { label: 'GitHub',   val: 'github.com/ischrack',          href: 'https://github.com/ischrack' },
      { label: 'ORCID',    val: '0000-0002-6189-2087',          href: 'https://orcid.org/0000-0002-6189-2087' },
    ],
  },

  /* ─── EXPERTISE ────────────────────────────────────────── */
  expertise: [
    {
      id: 'bioinformatics',
      cmd: 'bioinformatics --tools ngs,scrna,tcr',
      title: 'Bioinformatics',
      img: 'uploads/Bioinformatics.png',
      imgBg: '#0e1410',
      text: 'Leveraged next-generation sequencing — including bulk RNA-seq, scRNA-seq, and TCR repertoire profiling — to characterize immune dynamics in the tumor microenvironment. Developed computational pipelines to extract mechanistic insight from high-dimensional datasets, connecting transcriptomic signatures to functional immune phenotypes.',
      tags: ['scRNA-seq', 'TCR repertoire', 'bulk RNA-seq', 'Python', 'R / Bioconductor', 'DESeq2', 'Seurat'],
    },
    {
      id: 'immuno-oncology',
      cmd: 'immuno_oncology --focus TME,metastasis',
      title: 'Immuno-Oncology',
      img: 'uploads/ImmunoOncology.png',
      imgBg: '#0e0e18',
      text: 'Studied how the immune system shapes metastatic progression, with emphasis on T cell exclusion and dysfunction in secondary tumor sites. Combined in vivo models with multi-omics to map immune-tumor crosstalk and identify targetable nodes in the metastatic cascade.',
      tags: ['Tumor microenvironment', 'Metastasis', 'Flow cytometry', 'In vivo models', 'Multiplex IHC'],
    },
    {
      id: 'tcell-biology',
      cmd: 'tcell_biology --state exhaustion,memory',
      title: 'T Cell Biology',
      img: 'uploads/TCellBio.png',
      imgBg: '#0c0e1a',
      text: 'Characterized T cell differentiation trajectories and dysfunction states across tumor-draining tissues. Applied single-cell approaches to resolve heterogeneity within exhausted T cell populations, linking epigenetic and transcriptional programs to functional outcomes and therapeutic responsiveness.',
      tags: ['T cell exhaustion', 'Effector / memory', 'scRNA-seq', 'ATAC-seq', 'Cytokine profiling'],
    },
    {
      id: 'protein-engineering',
      cmd: 'protein_eng --modality CAR-T,safety',
      title: 'Protein Engineering',
      img: 'uploads/ProteinEng.png',
      imgBg: '#18100e',
      text: 'Engineered novel chimeric antigen receptor (CAR) constructs with improved safety profiles for solid tumor applications. Designed and screened synthetic receptor architectures that modulate T cell activation thresholds, reducing on-target/off-tumor toxicity while preserving anti-tumor potency.',
      tags: ['CAR-T cells', 'Synthetic biology', 'Lentiviral vectors', 'Receptor design', 'Safety switches'],
    },
  ],

  /* ─── PUBLICATIONS ─────────────────────────────────────── */
  publications: [
    { authors:"Schrack, I.A., Pereles, R.S., Escalona, G., Kang, K., Griffin, K., Ma, J.A., Jeruss, J.S., Shea, L.D.", year:"2025", title:"Pro-Metastatic Reprogramming of Neutrophils Distinguishes Progressive from Non-Progressive Metastatic Niches in Triple-Negative Breast Cancer.", journal:"In preparation", doi:null, first:true },
    { authors:"Schrack, I.A., Pereles, R.S., Ma, J.A., Urie, R.R., Irish, E.R., Escalona, G., Griffin, K.V., Kang, K., Jeruss, J.S., Shea, L.D.", year:"2025", title:"Longitudinal Monitoring of T cell Dynamics in Metastatic Breast Cancer via a Remote Diagnostic Implant.", journal:"Immunomedicine", doi:"10.1002/imed.70000", first:true },
    { authors:"Xu, Z.†, Escalona, G.†, Schrack, I., Zhang, W., Zhai, T., Shea, L.D., Wang, X.", year:"2025", title:"Detecting metastatic potential of cancer through longitudinal vasculature imaging of biomaterial scaffold using non-invasive in vivo photoacoustic microscopy and optical coherence tomography.", journal:"Theranostics", doi:"10.7150/thno.101685", note:"15(2):509–520", first:false },
    { authors:"Escalona, G., Ocadiz-Ruiz, R., Ma, J.A., Schrack, I.A., Ross, B.C., Morrison, A.K., Jeruss, J.S., Shea, L.D.", year:"2025", title:"Design Principles of an Engineered Metastatic Niche for Monitoring of Cancer Progression.", journal:"Biotechnology and Bioengineering", doi:"10.1002/bit.28895", note:"122(3):631–641", first:false },
    { authors:"Ma, J.A., Orbach, S.M., Griffin, K.V., Kang, K., Zhang, Y., Pereles, R.S., Schrack, I.A., Escalona, G., Jeruss, J.S., Shea, L.D.", year:"2025", title:"Early metastasis is characterized by Gr1+ cell dysregulation and is inhibited by immunomodulatory nanoparticles.", journal:"Molecular Oncology", doi:"10.1002/1878-0261.70040", note:"19:2860–2881", first:false },
    { authors:"Raghani, R.*, Urie, R.R.*, Ma, J.A., Escalona, G., Schrack, I.A., DiLillo, K., Kandagtla, P., Decker, J., Morris, A., Arnold, K., Jeruss, J., Shea, L.D.", year:"2024", title:"Engineered Immunologic Niche Monitors Checkpoint Blockade Response and Probes Mechanisms of Resistance.", journal:"ImmunoMedicine", doi:"10.1002/imed.1052", note:"4:e1052", first:false },
    { authors:"Klesmith, J.R., Su, L., Wu, L., Schrack, I.A., Dufort, F.J., Birt, A., Ambrose, C., Hackel, B.J., Lobb, R.R., Rennert, P.D.", year:"2019", title:"Retargeting CD19 Chimeric Antigen Receptor T Cells via Engineered CD19-Fusion Proteins.", journal:"Molecular Pharmaceutics", doi:"10.1021/acs.molpharmaceut.9b00418", note:"16(8):3544–3558", first:false },
    { authors:"Stern, L.A., Schrack, I.A., Johnson, S.M., Deshpande, A., Bennett, N.R., Harasymiw, L.A., Gardner, M.K., Hackel, B.J.", year:"2016", title:"Geometry and expression enhance enrichment of functional yeast-displayed ligands via cell panning.", journal:"Biotechnology and Bioengineering", doi:"10.1002/bit.26001", note:"113(11):2328–2341", first:false },
  ],

  /* ─── PRESENTATIONS ────────────────────────────────────── */
  presentations: [
    { authors:"Pereles, R.S.*, Schrack, I.A.*, Escalona, G., Kang, K., Griffin, K.V., Ma, J.A., Jeruss, J.S., Shea, L.D.", year:"2025", title:"Biomaterial Implants Recapitulate Lung Metastasis To Reveal Pro-Metastatic Neutrophil Reprogramming In Triple-Negative Breast Cancer.", venue:"Tissue Engineering and Regenerative Medicine International Society (TERMIS)" },
    { authors:"Xu, Z., Schrack, I., Escalona, G., Ma, C., Zhai, T., Zhang, W., Shea, L., Wang, X.", year:"2025", title:"Longitudinal monitoring of tumor cell migration and angiogenesis in the biomaterial scaffold in vivo.", venue:"SPIE Photons Plus Ultrasound: Imaging and Sensing", note:"Proc. SPIE PC13319, PC1331905" },
    { authors:"Irish, E., Schrack, I., Shea, L.", year:"2022", title:"Preventing Cancer Metastasis by T-Cells.", venue:"Undergraduate Research Symposium, University of Michigan, Ann Arbor, MI", award:"🏅 Blue Ribbon — Outstanding Poster & Presentation" },
    { authors:"Domala, N., Schrack, I., Shea, L.", year:"2022", title:"Nanoparticles and T-cell Activation in Cancer.", venue:"Undergraduate Research Symposium, University of Michigan, Ann Arbor, MI" },
    { authors:"Awuah, D., Stern, L., Schrack, I., Kim, T.Y., Cohen, J., Urak, R., Huynh, C., Chang, W.-C., Forman, S.J., Wang, X.", year:"2021", title:"Developing a Safer Anti-CD44v6 Chimeric Antigen Receptor T Cell Against Hematological Cancers By Mitigating on-Target Off-Tumor Toxicity.", venue:"Blood", note:"138(Supplement 1):2796" },
    { authors:"Schrack, I.A.", year:"2015", title:"Fluorescent Signal Dependency on Biotin and Lysate Concentrations.", venue:"Undergraduate Research Symposium, University of Minnesota, Minneapolis, MN" },
    { authors:"Schrack, I.A.", year:"2015", title:"Re-Engineering the Bacteriophage Coat for Avid Display of Fibronectin Domains.", venue:"Undergraduate Research Symposium, University of Minnesota, Minneapolis, MN" },
  ],
};
