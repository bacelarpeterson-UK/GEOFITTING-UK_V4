import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChevronRight, ChevronLeft, Check, User, Briefcase, GraduationCap, Building2, Languages, DollarSign, Users, Target, MapPin, Clock, FileText, Star, AlertCircle, TrendingUp, Calendar, Globe, Award, ChevronDown, ChevronUp, Info, Plane, Home, BookOpen, Heart, Loader2, CheckCircle2, Mail, Database, Download, Share2, Sparkles, Shield, Zap, ArrowRight, Quote, Play } from 'lucide-react';
import { initEmailJS, submitQuestionnaireData } from '../lib/integrations';

export default function Geofitting() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(0);
  const [activeTab, setActiveTab] = useState('resumo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
    // Seção 1: Dados Pessoais
    nomeCompleto: '',
    email: '',
    telefone: '',
    faixaEtaria: '',
    cidadeAtual: '',
    estadoCivil: '',
    nacionalidade: '',
    possuiDuplaCidadania: '',
    
    // Seção 2: Perfil Profissional
    areaAtuacao: '',
    subAreaTech: '',
    nivelCargo: '',
    tipoContrato: '',
    setorEmpresa: '',
    porteEmpresa: '',
    anosExperiencia: '',
    tempoEmpresaAtual: '',
    gestaoEquipe: '',
    trabalhoRemoto: '',
    
    // Seção 3: Realizações
    possuiPremios: '',
    tipoPremios: [],
    possuiPublicacoes: '',
    tipoPublicacoes: [],
    possuiPatentes: '',
    possuiPalestras: '',
    nivelPalestras: [],
    aparicoesMidia: '',
    tipoMidia: [],
    membroAssociacao: '',
    contribuicoesOpenSource: '',
    mentoria: '',
    
    // Seção 4: Formação Acadêmica
    nivelFormacao: '',
    areaCurso: '',
    tipoInstituicao: '',
    posGraduacao: '',
    instituicaoPosReconhecida: '',
    certificacoes: [],
    
    // Seção 5: Situação Empresarial
    possuiEmpresa: '',
    setorEmpresaPropria: '',
    faturamentoAnual: '',
    numeroFuncionarios: '',
    tempoEmpresaAberta: '',
    atuacaoInternacional: '',
    interesseEmpreenderExterior: '',
    tipoNegocioExterior: '',
    
    // Seção 6: Idiomas
    nivelIngles: '',
    certificacaoIngles: '',
    nivelEspanhol: '',
    nivelFrances: '',
    nivelAlemao: '',
    nivelItaliano: '',
    outroIdioma: '',
    disposicaoAprender: '',
    
    // Seção 7: Capacidade Financeira
    rendaMensalFamiliar: '',
    fonteRendaPrincipal: '',
    estabilidadeRenda: '',
    patrimonioLiquido: '',
    tipoPatrimonio: [],
    capacidadeInvestimento: '',
    reservaEmergencia: '',
    dividasSignificativas: '',
    disposicaoGoldenVisa: '',
    
    // Seção 8: Composição Familiar
    situacaoConjuge: '',
    areaConjuge: '',
    nivelInglesConjuge: '',
    flexibilidadeConjuge: '',
    numeroFilhos: '',
    faixaEtariaFilhos: [],
    tipoEscolaAtual: '',
    necessidadesEspeciais: '',
    outrosDependentes: '',
    
    // Seção 9: Objetivos de Vida
    motivacaoPrincipal: [],
    objetivoCarreira: '',
    expectativaSalarial: '',
    prioridadeVidaTrabalho: '',
    planoRetorno: '',
    horizonteTempo: '',
    objetivoEducacaoFilhos: '',
    planoAposentadoria: '',
    
    // Seção 10: Preferências de Destino
    paisesInteresse: [],
    paisesDescartados: [],
    preferenciaRegiao: '',
    preferenciaClima: '',
    preferenciaTamanhoCidade: '',
    importanciaComunidadeBR: '',
    preferenciaIdiomaPais: '',
    importanciaProximidadeBR: '',
    preferenciaEstiloVida: '',
    toleranciaCustoVida: '',
    prioridadeSeguranca: '',
    
    // Seção 11: Timeline e Urgência
    prazoIdeal: '',
    flexibilidadePrazo: '',
    situacaoAtualBrasil: '',
    fatoresUrgencia: [],
    disponibilidadeViagem: '',
    disponibilidadeMudanca: '',
    jaIniciouProcesso: '',
    processoAnterior: '',
    conhecimentoRotas: '',
    rotasConhecidas: [],
    disposicaoInvestirTempo: '',
    disposicaoInvestirDinheiro: ''
  });

  // Inicializar EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  // Dados completos dos países e rotas
  const countryData = {
    portugal: {
      nome: 'Portugal',
      bandeira: '🇵🇹',
      capital: 'Lisboa',
      idioma: 'Português',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Muito grande (300k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        techVisa: {
          nome: 'Tech Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais de tecnologia com proposta de trabalho em empresa certificada pelo IAPMEI.',
          requisitos: ['Proposta de trabalho de empresa certificada', 'Formação superior em área de TI ou 5+ anos experiência', 'Contrato com salário mínimo de €1.500/mês', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '85%',
          vantagens: ['Processo simplificado', 'Família incluída', 'Caminho para cidadania'],
          desvantagens: ['Depende de proposta de emprego', 'Restrito a empresas certificadas']
        },
        d7: {
          nome: 'D7 - Visto de Rendimentos',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva mínima de €760/mês', 'Comprovação de origem lícita', 'Alojamento em Portugal', 'Seguro saúde'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Não precisa de emprego', 'Pode trabalhar em PT', 'Família incluída'],
          desvantagens: ['Precisa comprovar renda recorrente', 'Exige presença física']
        },
        d8: {
          nome: 'D8 - Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com empresas estrangeiras.',
          requisitos: ['Contrato remoto com empresa estrangeira', 'Renda mínima de €3.040/mês', 'Seguro saúde internacional', 'Comprovante de alojamento'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '82%',
          vantagens: ['Mantém emprego atual', 'Processo rápido', 'Pode levar família'],
          desvantagens: ['Renda mínima alta', 'Precisa vínculo com empresa estrangeira']
        },
        goldenVisa: {
          nome: 'Golden Visa',
          tipo: 'Investimento',
          descricao: 'Autorização de residência através de investimento qualificado.',
          requisitos: ['Investimento mínimo de €500.000 em fundos', 'Ou €500.000 em pesquisa científica', 'Manutenção por 5 anos'],
          timeline: '6-12 meses',
          custoEstimado: '€500.000+',
          taxaSucesso: '95%',
          vantagens: ['Não exige residência contínua', 'Caminho rápido para cidadania', 'Acesso a toda UE'],
          desvantagens: ['Alto investimento', 'Imóveis não qualificam mais em Lisboa/Porto']
        }
      },
      cidades: ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Cascais', 'Setúbal']
    },
    alemanha: {
      nome: 'Alemanha',
      bandeira: '🇩🇪',
      capital: 'Berlim',
      idioma: 'Alemão',
      custoVida: 'Médio-Alto',
      qualidadeVida: '9/10',
      seguranca: '8/10',
      clima: 'Temperado',
      comunidadeBR: 'Grande (150k+)',
      tempoResidencia: '8 anos para cidadania (pode reduzir para 6)',
      rotas: {
        blueCard: {
          nome: 'EU Blue Card',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais altamente qualificados.',
          requisitos: ['Diploma universitário reconhecido', 'Salário mínimo de €45.300/ano', 'Para áreas de escassez (TI): €41.000/ano', 'Contrato de pelo menos 1 ano'],
          timeline: '2-4 meses',
          custoEstimado: '€100-500',
          taxaSucesso: '90%',
          vantagens: ['Família incluída', 'Mobilidade na UE após 18 meses', 'Residência permanente em 21-33 meses'],
          desvantagens: ['Exige diploma reconhecido', 'Precisa proposta de emprego']
        },
        chancenkarte: {
          nome: 'Chancenkarte (Opportunity Card)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto baseado em pontos para buscar trabalho.',
          requisitos: ['Mínimo 6 pontos no sistema', 'Pontos por: idade, idioma, experiência', 'Diploma ou qualificação profissional', 'Recursos para se manter'],
          timeline: '2-4 meses',
          custoEstimado: '€75-200',
          taxaSucesso: '75%',
          vantagens: ['Mais flexível', 'Pode trabalhar 20h/semana', 'Válido por 1 ano'],
          desvantagens: ['Novo programa', 'Sistema de pontos complexo']
        }
      },
      cidades: ['Berlim', 'Munique', 'Frankfurt', 'Hamburgo', 'Colônia', 'Stuttgart']
    },
    eua: {
      nome: 'Estados Unidos',
      bandeira: '🇺🇸',
      capital: 'Washington D.C.',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Variado',
      comunidadeBR: 'Muito grande (2M+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        eb2Niw: {
          nome: 'EB-2 NIW',
          tipo: 'Green Card direto',
          descricao: 'Green Card para profissionais cujo trabalho beneficia os EUA.',
          requisitos: ['Mestrado ou bacharelado + 5 anos experiência', 'Demonstrar benefício ao interesse nacional', 'Evidências de realizações excepcionais'],
          timeline: '12-24 meses',
          custoEstimado: '$15.000-25.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador sponsor', 'Green Card direto', 'Família incluída'],
          desvantagens: ['Processo complexo', 'Requer evidências robustas', 'Tempo de espera longo']
        },
        eb1a: {
          nome: 'EB-1A',
          tipo: 'Green Card direto',
          descricao: 'Green Card para indivíduos com habilidades extraordinárias.',
          requisitos: ['Prêmios nacionais/internacionais', 'Atender 3 de 10 critérios', 'Reconhecimento como top da área'],
          timeline: '8-18 meses',
          custoEstimado: '$15.000-30.000',
          taxaSucesso: '60%',
          vantagens: ['Processo mais rápido', 'Não precisa empregador', 'Premium processing disponível'],
          desvantagens: ['Critérios muito exigentes', 'Alto padrão de evidências']
        },
        o1a: {
          nome: 'O-1A',
          tipo: 'Visto temporário',
          descricao: 'Visto para indivíduos com habilidades extraordinárias.',
          requisitos: ['Atender 3 de 8 critérios', 'Prêmios, publicações, salário alto', 'Proposta de trabalho ou agente nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$8.000-15.000',
          taxaSucesso: '75%',
          vantagens: ['Mais rápido que EB-1A', 'Pode renovar indefinidamente', 'Cônjuge pode trabalhar'],
          desvantagens: ['Temporário', 'Vinculado ao empregador/agente']
        },
        l1a: {
          nome: 'L-1A',
          tipo: 'Transferência executiva',
          descricao: 'Visto para executivos transferidos de multinacional.',
          requisitos: ['1+ ano na empresa no exterior', 'Cargo executivo ou gerencial', 'Empresa com operação nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$10.000-20.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho para Green Card (EB-1C)', 'Cônjuge pode trabalhar', 'Sem limite de vistos'],
          desvantagens: ['Restrito a multinacionais', 'Precisa cargo gerencial real']
        }
      },
      cidades: ['Nova York', 'San Francisco', 'Austin', 'Miami', 'Los Angeles', 'Boston', 'Seattle']
    },
    espanha: {
      nome: 'Espanha',
      bandeira: '🇪🇸',
      capital: 'Madri',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Grande (200k+)',
      tempoResidencia: '2 anos para cidadania (brasileiros)',
      rotas: {
        nomadaDigital: {
          nome: 'Visa Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com clientes internacionais.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima de €2.520/mês', '3+ anos de experiência', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Mantém trabalho atual', 'Válido por 3 anos', 'Regime fiscal especial'],
          desvantagens: ['Máximo 20% clientes espanhóis', 'Renda mínima considerável']
        },
        altamenteQualificado: {
          nome: 'Visa Altamente Qualificado',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais com alta qualificação.',
          requisitos: ['Diploma universitário ou 3+ anos experiência', 'Salário mínimo de €40.000/ano', 'Empresa cadastrada no UGE'],
          timeline: '1-3 meses',
          custoEstimado: '€500-1.000',
          taxaSucesso: '85%',
          vantagens: ['Processo rápido', 'Família incluída', 'Caminho para residência'],
          desvantagens: ['Restrito a empresas grandes', 'Vinculado ao empregador']
        }
      },
      cidades: ['Madri', 'Barcelona', 'Valência', 'Sevilha', 'Málaga', 'Bilbao']
    },
    holanda: {
      nome: 'Holanda',
      bandeira: '🇳🇱',
      capital: 'Amsterdã',
      idioma: 'Holandês (inglês amplamente falado)',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        kennismigrant: {
          nome: 'Highly Skilled Migrant',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais qualificados.',
          requisitos: ['Proposta de empresa reconhecida (IND sponsor)', 'Salário mínimo de €4.752/mês (ou €3.549 se <30 anos)', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: '€320-1.000',
          taxaSucesso: '95%',
          vantagens: ['Processo muito rápido', 'Cônjuge pode trabalhar', '30% tax ruling'],
          desvantagens: ['Salário mínimo alto', 'Restrito a empresas reconhecidas']
        },
        startupVisa: {
          nome: 'Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com ideia inovadora.',
          requisitos: ['Produto/serviço inovador', 'Facilitador aprovado', 'Recursos financeiros', 'Plano de negócios'],
          timeline: '1-3 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao ecossistema de startups', 'Pode evoluir para self-employed'],
          desvantagens: ['Precisa facilitador', 'Válido apenas 1 ano inicialmente']
        }
      },
      cidades: ['Amsterdã', 'Rotterdam', 'Haia', 'Utrecht', 'Eindhoven', 'Groningen']
    },
    canada: {
      nome: 'Canadá',
      bandeira: '🇨🇦',
      capital: 'Ottawa',
      idioma: 'Inglês/Francês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Frio',
      comunidadeBR: 'Grande (100k+)',
      tempoResidencia: '3 anos para cidadania',
      rotas: {
        expressEntry: {
          nome: 'Express Entry',
          tipo: 'Sistema de pontos',
          descricao: 'Sistema de pontos para imigração qualificada.',
          requisitos: ['Pontuação CRS competitiva (470+)', 'Teste de idioma (IELTS/CELPIP)', 'Avaliação de credenciais (ECA)', 'Experiência de trabalho qualificado'],
          timeline: '6-12 meses',
          custoEstimado: 'CAD$2.500-5.000',
          taxaSucesso: '80%',
          vantagens: ['Residência permanente direta', 'Processo transparente', 'Pode levar família'],
          desvantagens: ['Alta competição', 'Pontuação muda frequentemente']
        },
        pnp: {
          nome: 'Provincial Nominee Program',
          tipo: 'Nomeação provincial',
          descricao: 'Programas provinciais para residência permanente.',
          requisitos: ['Variam por província', 'Experiência na área demandada', 'Conexão com a província', 'Intenção de residir na província'],
          timeline: '12-18 meses',
          custoEstimado: 'CAD$2.000-5.000',
          taxaSucesso: '75%',
          vantagens: ['+600 pontos no Express Entry', 'Opções para diferentes perfis'],
          desvantagens: ['Compromisso com província', 'Processos variam muito']
        }
      },
      cidades: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton']
    },
    // ===== NOVOS PAÍSES =====
    irlanda: {
      nome: 'Irlanda',
      bandeira: '🇮🇪',
      capital: 'Dublin',
      idioma: 'Inglês/Irlandês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Grande (70k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        criticalSkills: {
          nome: 'Critical Skills Employment Permit',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas de alta demanda como TI, engenharia e saúde.',
          requisitos: ['Oferta de emprego em área crítica', 'Salário mínimo €38.000/ano (€64.000 para outras áreas)', 'Diploma relevante ou 5+ anos experiência', 'Empresa registrada na Irlanda'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '85%',
          vantagens: ['Caminho rápido para residência', 'Cônjuge pode trabalhar', 'Acesso ao mercado tech europeu'],
          desvantagens: ['Custo de vida alto em Dublin', 'Restrito a áreas específicas']
        },
        generalEmployment: {
          nome: 'General Employment Permit',
          tipo: 'Trabalho geral',
          descricao: 'Visto para profissionais em áreas não críticas com oferta de emprego.',
          requisitos: ['Oferta de emprego', 'Salário mínimo €34.000/ano', 'Labour Market Needs Test', 'Empresa deve provar que não há candidato local'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '70%',
          vantagens: ['Mais abrangente que Critical Skills', 'Pode evoluir para residência'],
          desvantagens: ['Processo mais demorado', 'Precisa Labour Market Test']
        },
        startupVisa: {
          nome: 'Start-up Entrepreneur Programme',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e financiamento.',
          requisitos: ['Negócio inovador e escalável', 'Financiamento mínimo €50.000', 'Sede na Irlanda', 'Aprovação do comitê de avaliação'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '65%',
          vantagens: ['Acesso ao ecossistema tech Dublin', 'Residência imediata', 'Incentivos fiscais'],
          desvantagens: ['Alto investimento inicial', 'Processo seletivo rigoroso']
        }
      },
      cidades: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny']
    },
    uk: {
      nome: 'Reino Unido',
      bandeira: '🇬🇧',
      capital: 'Londres',
      idioma: 'Inglês',
      custoVida: 'Muito Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledWorker: {
          nome: 'Skilled Worker Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho do Reino Unido pós-Brexit.',
          requisitos: ['Oferta de emprego de sponsor licenciado', 'Salário mínimo £26.200/ano (varia por área)', 'Nível B1 de inglês', 'Pontuação mínima de 70 pontos'],
          timeline: '3-8 semanas',
          custoEstimado: '£1.500-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo relativamente rápido', 'Pode levar família', 'Caminho para ILR em 5 anos'],
          desvantagens: ['Vinculado ao empregador', 'Custos de NHS surcharge']
        },
        globalTalent: {
          nome: 'Global Talent Visa',
          tipo: 'Talento excepcional',
          descricao: 'Visto para líderes e talentos excepcionais em tech, ciência, artes ou academia.',
          requisitos: ['Endorsement de órgão competente (Tech Nation para tech)', 'Evidências de liderança ou potencial', 'Contribuições significativas na área', 'Não precisa oferta de emprego'],
          timeline: '3-8 semanas',
          custoEstimado: '£700-2.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador', 'Flexibilidade total', 'ILR em 3 anos'],
          desvantagens: ['Critérios muito exigentes', 'Processo de endorsement complexo']
        },
        innovatorFounder: {
          nome: 'Innovator Founder Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e escalável.',
          requisitos: ['Negócio inovador e viável', 'Endorsement de entidade aprovada', 'Inglês nível B2', 'Fundos de manutenção'],
          timeline: '2-3 meses',
          custoEstimado: '£1.500-3.000',
          taxaSucesso: '65%',
          vantagens: ['ILR em 3 anos se metas atingidas', 'Pode trazer família', 'Acesso ao mercado UK'],
          desvantagens: ['Precisa endorsement', 'Metas obrigatórias']
        },
        highPotential: {
          nome: 'High Potential Individual Visa',
          tipo: 'Recém-graduados',
          descricao: 'Visto para graduados de universidades top mundiais nos últimos 5 anos.',
          requisitos: ['Graduação em universidade top global (lista específica)', 'Nos últimos 5 anos', 'Inglês nível B1', 'Fundos de manutenção'],
          timeline: '2-4 semanas',
          custoEstimado: '£750-1.500',
          taxaSucesso: '90%',
          vantagens: ['Não precisa emprego', 'Válido por 2-3 anos', 'Pode trabalhar em qualquer área'],
          desvantagens: ['Só para universidades da lista', 'Limite de 5 anos após graduação']
        }
      },
      cidades: ['Londres', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Cambridge', 'Oxford']
    },
    italia: {
      nome: 'Itália',
      bandeira: '🇮🇹',
      capital: 'Roma',
      idioma: 'Italiano',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10 anos para cidadania (3-4 se ascendência)',
      rotas: {
        nomadeDigitale: {
          nome: 'Visto Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Novo visto (2024) para trabalhadores remotos com renda do exterior.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima €28.000/ano', 'Seguro saúde', 'Comprovante de acomodação'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Pode morar em qualquer região', 'Custo de vida mais baixo que norte da Europa', 'Qualidade de vida'],
          desvantagens: ['Burocracia italiana', 'Idioma pode ser barreira']
        },
        lavoroSubordinato: {
          nome: 'Visto de Trabalho (Subordinato)',
          tipo: 'Trabalho com contrato',
          descricao: 'Visto para trabalho com contrato de empresa italiana.',
          requisitos: ['Contrato de trabalho italiano', 'Nulla Osta do empregador', 'Dentro da quota anual', 'Qualificações comprovadas'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao sistema de saúde italiano', 'Direitos trabalhistas europeus'],
          desvantagens: ['Sistema de quotas limitado', 'Processo burocrático lento']
        },
        startupVisa: {
          nome: 'Italia Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores inovadores que querem abrir startup na Itália.',
          requisitos: ['Plano de negócios inovador', 'Capital mínimo €50.000', 'Aprovação do comitê italiano', 'Parceria com incubadora credenciada'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '60%',
          vantagens: ['Ecossistema de startups crescente', 'Incentivos fiscais', 'Qualidade de vida'],
          desvantagens: ['Mercado menor que outros hubs', 'Burocracia']
        },
        eletivoResidenza: {
          nome: 'Visto Eletivo (Residência Eletiva)',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva que não pretendem trabalhar.',
          requisitos: ['Renda passiva comprovada (€31.000+/ano)', 'Não pode trabalhar na Itália', 'Seguro saúde', 'Acomodação adequada'],
          timeline: '3-6 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '75%',
          vantagens: ['Ideal para aposentados', 'Acesso à cultura italiana', 'Custo de vida razoável'],
          desvantagens: ['Não pode trabalhar', 'Renda mínima considerável']
        }
      },
      cidades: ['Roma', 'Milão', 'Florença', 'Veneza', 'Nápoles', 'Bolonha', 'Turim']
    },
    franca: {
      nome: 'França',
      bandeira: '🇫🇷',
      capital: 'Paris',
      idioma: 'Francês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Temperado/Mediterrâneo (sul)',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        passeportTalent: {
          nome: 'Passeport Talent',
          tipo: 'Talento qualificado',
          descricao: 'Visto multiuso para profissionais qualificados, pesquisadores, artistas e empreendedores.',
          requisitos: ['Diploma de mestrado ou equivalente', 'Contrato com salário 1.5x o mínimo (€27.000+)', 'Ou projeto reconhecido', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€200-1.000',
          taxaSucesso: '80%',
          vantagens: ['Válido por 4 anos', 'Família pode trabalhar', 'Caminho para residência'],
          desvantagens: ['Francês não obrigatório mas recomendado', 'Paris muito cara']
        },
        salarie: {
          nome: 'Visa Salarié',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto de trabalho tradicional com contrato de empresa francesa.',
          requisitos: ['Contrato de trabalho francês', 'Autorização da DIRECCTE', 'Qualificações para a vaga', 'Empresa deve justificar contratação estrangeira'],
          timeline: '3-6 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '70%',
          vantagens: ['Direitos trabalhistas franceses', 'Sistema de saúde público'],
          desvantagens: ['Processo burocrático', 'Precisa justificar contratação']
        },
        entrepreneurLiberal: {
          nome: 'Entrepreneur/Libéral',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para autônomos e empreendedores com projeto viável.',
          requisitos: ['Plano de negócios viável', 'Recursos financeiros suficientes', 'Projeto economicamente sustentável', 'Registro na França'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '65%',
          vantagens: ['Autonomia profissional', 'Acesso ao mercado europeu'],
          desvantagens: ['Burocracia francesa', 'Impostos altos']
        },
        visiteur: {
          nome: 'Visa Visiteur',
          tipo: 'Renda passiva',
          descricao: 'Visto de longa duração para quem tem recursos próprios.',
          requisitos: ['Renda passiva ou recursos suficientes', 'Não pode trabalhar', 'Seguro saúde', 'Moradia na França'],
          timeline: '2-4 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '80%',
          vantagens: ['Processo simples', 'Ideal para aposentados', 'Qualidade de vida'],
          desvantagens: ['Não pode trabalhar', 'Custo de vida alto']
        }
      },
      cidades: ['Paris', 'Lyon', 'Marselha', 'Toulouse', 'Nice', 'Bordeaux', 'Nantes']
    },
    belgica: {
      nome: 'Bélgica',
      bandeira: '🇧🇪',
      capital: 'Bruxelas',
      idioma: 'Francês/Holandês/Alemão',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico',
      comunidadeBR: 'Média (40k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        singlePermit: {
          nome: 'Single Permit (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão única combinando autorização de trabalho e residência.',
          requisitos: ['Contrato de trabalho belga', 'Qualificações para a vaga', 'Salário adequado ao cargo', 'Empresa deve solicitar'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '80%',
          vantagens: ['Centro da Europa', 'Hub das instituições EU', 'Multilíngue'],
          desvantagens: ['Impostos altos', 'Clima cinzento', 'Burocracia complexa']
        },
        blueCardBE: {
          nome: 'EU Blue Card Bélgica',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card europeu para profissionais com diploma superior.',
          requisitos: ['Diploma universitário (3+ anos)', 'Salário mínimo €52.000/ano', 'Contrato de pelo menos 1 ano', 'Área relacionada ao diploma'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade na UE', 'Família pode acompanhar', 'Residência permanente em 5 anos'],
          desvantagens: ['Salário mínimo alto', 'Precisa diploma relacionado']
        },
        selfEmployed: {
          nome: 'Cartão Profissional (Autônomo)',
          tipo: 'Empreendedorismo',
          descricao: 'Permissão para trabalhar como autônomo ou abrir empresa.',
          requisitos: ['Plano de negócios detalhado', 'Valor agregado para economia belga', 'Recursos financeiros', 'Qualificações profissionais'],
          timeline: '4-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '60%',
          vantagens: ['Localização estratégica', 'Acesso ao mercado EU', 'Sistema de saúde excelente'],
          desvantagens: ['Processo subjetivo', 'Impostos muito altos']
        }
      },
      cidades: ['Bruxelas', 'Antuérpia', 'Gante', 'Bruges', 'Liège', 'Leuven']
    },
    austria: {
      nome: 'Áustria',
      bandeira: '🇦🇹',
      capital: 'Viena',
      idioma: 'Alemão',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Continental/Alpino',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '10 anos para cidadania',
      rotas: {
        rotWeissRot: {
          nome: 'Red-White-Red Card',
          tipo: 'Sistema de pontos',
          descricao: 'Cartão baseado em pontos para trabalhadores qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: qualificação, experiência, idade, idioma', 'Oferta de emprego ou qualificação especial', 'Seguro saúde'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '80%',
          vantagens: ['Sistema transparente', 'Alta qualidade de vida', 'Segurança'],
          desvantagens: ['Alemão muito importante', 'Comunidade BR pequena', 'Cidadania demora 10 anos']
        },
        blueCardAT: {
          nome: 'EU Blue Card Áustria',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card para profissionais com diploma universitário.',
          requisitos: ['Diploma universitário', 'Oferta de emprego', 'Salário mínimo €45.000/ano', 'Contrato de 1+ ano'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade EU após 18 meses', 'Qualidade de vida excelente', 'Sistema de saúde top'],
          desvantagens: ['Alemão necessário longo prazo', 'Cidadania demora muito']
        },
        startupAT: {
          nome: 'Start-up Visa Austria',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para fundadores de startups inovadoras.',
          requisitos: ['Ideia de negócio inovadora', 'Capital mínimo disponível', 'Apoio de incubadora austríaca', 'Plano de negócios'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '65%',
          vantagens: ['Ecossistema startup crescente', 'Localização central na Europa', 'Incentivos fiscais'],
          desvantagens: ['Mercado menor', 'Alemão importante']
        }
      },
      cidades: ['Viena', 'Salzburgo', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt']
    },
    suica: {
      nome: 'Suíça',
      bandeira: '🇨🇭',
      capital: 'Berna',
      idioma: 'Alemão/Francês/Italiano',
      custoVida: 'Muito Alto',
      qualidadeVida: '10/10',
      seguranca: '10/10',
      clima: 'Alpino/Continental',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10-12 anos para cidadania',
      rotas: {
        permitB: {
          nome: 'Permit B (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão de residência para trabalho com contrato.',
          requisitos: ['Contrato de trabalho suíço', 'Empregador deve provar necessidade', 'Qualificações específicas', 'Prioridade para suíços/EU'],
          timeline: '2-4 meses',
          custoEstimado: 'CHF 500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Salários muito altos', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['Muito difícil conseguir', 'Custo de vida altíssimo', 'Cidadania muito demorada']
        },
        permitL: {
          nome: 'Permit L (Curta duração)',
          tipo: 'Trabalho temporário',
          descricao: 'Permissão para contratos de até 1 ano.',
          requisitos: ['Contrato de até 12 meses', 'Empregador suíço', 'Dentro da quota', 'Qualificações para a vaga'],
          timeline: '1-3 meses',
          custoEstimado: 'CHF 300-1.000',
          taxaSucesso: '75%',
          vantagens: ['Mais fácil que Permit B', 'Pode ser convertido', 'Experiência suíça'],
          desvantagens: ['Temporário', 'Limitado a 1 ano', 'Dentro de quota']
        },
        startupSuica: {
          nome: 'Startup Visa (Cantonal)',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores - varia por cantão.',
          requisitos: ['Plano de negócios sólido', 'Capital significativo', 'Criar empregos locais', 'Aprovação cantonal'],
          timeline: '3-6 meses',
          custoEstimado: 'CHF 5.000+',
          taxaSucesso: '50%',
          vantagens: ['Hub financeiro mundial', 'Estabilidade política', 'Localização central'],
          desvantagens: ['Processo muito seletivo', 'Custo altíssimo', 'Varia muito por cantão']
        }
      },
      cidades: ['Zurique', 'Genebra', 'Basileia', 'Berna', 'Lausanne', 'Lugano']
    },
    australia: {
      nome: 'Austrália',
      bandeira: '🇦🇺',
      capital: 'Canberra',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Variado (tropical a temperado)',
      comunidadeBR: 'Grande (60k+)',
      tempoResidencia: '4 anos para cidadania',
      rotas: {
        skilledIndependent: {
          nome: 'Skilled Independent (189)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto permanente baseado em pontos para profissionais qualificados.',
          requisitos: ['Ocupação na lista SOL', 'Mínimo 65 pontos', 'Skills assessment positivo', 'Inglês competente (IELTS 6+)', 'Menos de 45 anos'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '75%',
          vantagens: ['Residência permanente direta', 'Não precisa sponsor', 'Pode morar em qualquer lugar'],
          desvantagens: ['Alta competição', 'Processo demorado', 'Precisa ocupação na lista']
        },
        skilledNominated: {
          nome: 'Skilled Nominated (190)',
          tipo: 'Nomeação estadual',
          descricao: 'Visto permanente com nomeação de estado ou território.',
          requisitos: ['Nomeação de estado/território', 'Mínimo 65 pontos (inclui +5 da nomeação)', 'Skills assessment', 'Compromisso com o estado'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '80%',
          vantagens: ['+5 pontos da nomeação', 'Mais opções de ocupação', 'Residência permanente'],
          desvantagens: ['Compromisso de morar no estado', 'Depende de nomeação']
        },
        employerSponsored: {
          nome: 'Employer Sponsored (482/494)',
          tipo: 'Patrocínio empregador',
          descricao: 'Visto temporário ou regional com sponsor de empregador.',
          requisitos: ['Sponsor aprovado', 'Ocupação elegível', '2+ anos experiência', 'Inglês competente', 'Skills assessment (algumas ocupações)'],
          timeline: '3-6 meses',
          custoEstimado: 'AUD$3.000-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo mais rápido', 'Pode levar para PR depois', 'Emprego garantido'],
          desvantagens: ['Vinculado ao empregador', 'Temporário inicialmente']
        },
        globalTalentAU: {
          nome: 'Global Talent Visa (858)',
          tipo: 'Talento excepcional',
          descricao: 'Visto para talentos de classe mundial em setores prioritários.',
          requisitos: ['Reconhecimento internacional na área', 'Salário acima de AUD$162.000 ou potencial', 'Setores: tech, saúde, energia, etc.', 'Nominador australiano'],
          timeline: '2-6 meses',
          custoEstimado: 'AUD$4.500-6.000',
          taxaSucesso: '70%',
          vantagens: ['Processo rápido', 'Residência permanente direta', 'Não precisa emprego'],
          desvantagens: ['Critérios muito exigentes', 'Precisa nominador']
        }
      },
      cidades: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra']
    },
    novaZelandia: {
      nome: 'Nova Zelândia',
      bandeira: '🇳🇿',
      capital: 'Wellington',
      idioma: 'Inglês/Maori',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledMigrant: {
          nome: 'Skilled Migrant Category',
          tipo: 'Sistema de pontos',
          descricao: 'Principal via de imigração qualificada para NZ.',
          requisitos: ['Mínimo 6 pontos (novo sistema 2023)', 'Oferta de emprego qualificado ou', 'Qualificação em área de demanda', 'Inglês competente', 'Menos de 55 anos'],
          timeline: '6-12 meses',
          custoEstimado: 'NZD$4.000-6.000',
          taxaSucesso: '75%',
          vantagens: ['Residência direta', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['País isolado', 'Mercado pequeno', 'Custo de vida alto']
        },
        workToResidence: {
          nome: 'Work to Residence',
          tipo: 'Trabalho para residência',
          descricao: 'Visto de trabalho que pode levar à residência.',
          requisitos: ['Oferta de emprego qualificado', 'Salário mediano ou acima', 'Empregador acreditado', '2 anos no emprego para residência'],
          timeline: '2-4 meses',
          custoEstimado: 'NZD$1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho claro para residência', 'Pode trazer família', 'Experimenta antes'],
          desvantagens: ['Precisa emprego primeiro', 'Vinculado ao empregador']
        },
        entrepreneurVisa: {
          nome: 'Entrepreneur Work Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com plano de negócio aprovado.',
          requisitos: ['Plano de negócios aprovado', 'Capital mínimo NZD$100.000', 'Experiência empresarial', 'Inglês competente'],
          timeline: '3-6 meses',
          custoEstimado: 'NZD$100.000+',
          taxaSucesso: '60%',
          vantagens: ['Pode trazer família', 'Caminho para residência', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Mercado pequeno', 'Isolamento geográfico']
        }
      },
      cidades: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Queenstown', 'Dunedin']
    },
    emirados: {
      nome: 'Emirados Árabes',
      bandeira: '🇦🇪',
      capital: 'Abu Dhabi',
      idioma: 'Árabe (inglês amplamente usado)',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '9/10',
      clima: 'Desértico (muito quente)',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: 'Sem cidadania (apenas residência)',
      rotas: {
        employmentVisa: {
          nome: 'Employment Visa',
          tipo: 'Trabalho',
          descricao: 'Visto de trabalho padrão com sponsor de empregador.',
          requisitos: ['Oferta de emprego', 'Empregador faz o sponsor', 'Exame médico', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 3.000-10.000',
          taxaSucesso: '95%',
          vantagens: ['Processo rápido', 'Zero imposto de renda', 'Salários altos', 'Hub internacional'],
          desvantagens: ['Vinculado ao empregador', 'Sem cidadania', 'Calor extremo', 'Cultura diferente']
        },
        goldenVisaUAE: {
          nome: 'Golden Visa UAE',
          tipo: 'Residência longa duração',
          descricao: 'Residência de 10 anos para investidores, talentos e profissionais.',
          requisitos: ['Investimento imobiliário AED 2M+ ou', 'Profissional qualificado com salário AED 30.000+/mês ou', 'Empreendedor com projeto aprovado ou', 'Talento excepcional'],
          timeline: '1-2 meses',
          custoEstimado: 'AED 5.000-15.000',
          taxaSucesso: '90%',
          vantagens: ['10 anos de residência', 'Não precisa sponsor', 'Pode fazer negócios', 'Família incluída'],
          desvantagens: ['Requisitos altos', 'Sem caminho para cidadania', 'Custo de vida alto']
        },
        freelanceVisa: {
          nome: 'Freelance/Self-Sponsor Visa',
          tipo: 'Autônomo',
          descricao: 'Visto para freelancers e profissionais independentes.',
          requisitos: ['Registro em free zone ou DED', 'Comprovação de renda/clientes', 'Seguro saúde', 'Taxa de licença'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 15.000-30.000/ano',
          taxaSucesso: '90%',
          vantagens: ['Autonomia', 'Zero impostos', 'Pode ter múltiplos clientes'],
          desvantagens: ['Custo de manutenção anual', 'Precisa renovar licença', 'Sem benefícios trabalhistas']
        }
      },
      cidades: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah']
    },
    singapura: {
      nome: 'Singapura',
      bandeira: '🇸🇬',
      capital: 'Singapura',
      idioma: 'Inglês/Mandarim/Malaio/Tamil',
      custoVida: 'Muito Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Tropical (quente e úmido)',
      comunidadeBR: 'Pequena (5k+)',
      tempoResidencia: '2 anos para PR, mais 2 para cidadania',
      rotas: {
        employmentPass: {
          nome: 'Employment Pass',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho para profissionais qualificados.',
          requisitos: ['Salário mínimo SGD 5.000/mês (mais para experientes)', 'Qualificações reconhecidas', 'Oferta de empregador', 'Framework COMPASS (pontos)'],
          timeline: '3-8 semanas',
          custoEstimado: 'SGD 300-1.000',
          taxaSucesso: '70%',
          vantagens: ['Hub asiático', 'Zero imposto sobre ganhos no exterior', 'Inglês oficial', 'Infraestrutura excelente'],
          desvantagens: ['Muito competitivo', 'Custo de vida altíssimo', 'Espaço limitado', 'Rigoroso']
        },
        entrePass: {
          nome: 'EntrePass',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com startup inovadora.',
          requisitos: ['Empresa inovadora registrada em SG', 'Funding de VC ou incubadora reconhecida ou', 'Propriedade intelectual ou', 'Track record excepcional'],
          timeline: '2-3 meses',
          custoEstimado: 'SGD 500-2.000',
          taxaSucesso: '50%',
          vantagens: ['Ecossistema startup top mundial', 'Acesso ao mercado asiático', 'Incentivos fiscais'],
          desvantagens: ['Muito seletivo', 'Precisa comprovar inovação', 'Metas obrigatórias']
        },
        personalizedEP: {
          nome: 'Personalised Employment Pass',
          tipo: 'Talento de alto nível',
          descricao: 'Passe especial para profissionais de altíssimo salário.',
          requisitos: ['Salário fixo SGD 22.500+/mês ou', 'EP holder com salário SGD 12.000+', 'Não vinculado a empregador específico'],
          timeline: '4-8 semanas',
          custoEstimado: 'SGD 300-500',
          taxaSucesso: '80%',
          vantagens: ['Flexibilidade de empregador', 'Pode ficar até 6 meses sem emprego', 'Prestígio'],
          desvantagens: ['Salário mínimo muito alto', 'Não pode empreender', 'Só para top performers']
        }
      },
      cidades: ['Singapura (cidade-estado)']
    },
    japao: {
      nome: 'Japão',
      bandeira: '🇯🇵',
      capital: 'Tóquio',
      idioma: 'Japonês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '10/10',
      clima: 'Temperado (4 estações)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5-10 anos para cidadania',
      rotas: {
        engineerSpecialist: {
          nome: 'Engineer/Specialist in Humanities',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas técnicas, TI, negócios.',
          requisitos: ['Diploma universitário ou 10+ anos experiência', 'Oferta de trabalho relacionada à formação', 'Contrato com empresa japonesa', 'Salário compatível com japoneses'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '80%',
          vantagens: ['Cultura única', 'Segurança excepcional', 'Tecnologia avançada'],
          desvantagens: ['Barreira do idioma', 'Cultura de trabalho intensa', 'Difícil integração']
        },
        hsfp: {
          nome: 'Highly Skilled Foreign Professional',
          tipo: 'Sistema de pontos',
          descricao: 'Visto preferencial para profissionais altamente qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: formação, experiência, salário, idade', 'Oferta de trabalho qualificado', 'Área acadêmica, técnica ou negócios'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '85%',
          vantagens: ['Residência permanente em 1-3 anos', 'Pode trazer pais', 'Cônjuge pode trabalhar'],
          desvantagens: ['Precisa 70+ pontos', 'Sistema complexo']
        },
        businessManager: {
          nome: 'Business Manager Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para abrir ou gerenciar negócio no Japão.',
          requisitos: ['Escritório físico no Japão', 'Capital mínimo ¥5.000.000', '2+ funcionários full-time ou investimento equivalente', 'Plano de negócios'],
          timeline: '2-4 meses',
          custoEstimado: '¥5.000.000+',
          taxaSucesso: '65%',
          vantagens: ['Controle do próprio negócio', 'Mercado grande', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Japonês importante', 'Burocracia']
        },
        specifiedSkilled: {
          nome: 'Specified Skilled Worker',
          tipo: 'Trabalho em setores específicos',
          descricao: 'Visto para trabalho em setores com escassez de mão de obra.',
          requisitos: ['Passar em teste de habilidades do setor', 'Teste básico de japonês (N4)', 'Setores: construção, agricultura, hotelaria, etc.', 'Menos de 5 anos (tipo 1)'],
          timeline: '2-4 meses',
          custoEstimado: '¥30.000-100.000',
          taxaSucesso: '75%',
          vantagens: ['Não precisa diploma', 'Demanda alta', 'Caminho para residência (tipo 2)'],
          desvantagens: ['Setores específicos', 'Precisa japonês básico', 'Temporário inicialmente']
        }
      },
      cidades: ['Tóquio', 'Osaka', 'Yokohama', 'Nagoya', 'Kyoto', 'Fukuoka', 'Sapporo']
    },
    mexico: {
      nome: 'México',
      bandeira: '🇲🇽',
      capital: 'Cidade do México',
      idioma: 'Espanhol',
      custoVida: 'Baixo-Médio',
      qualidadeVida: '7/10',
      seguranca: '5/10',
      clima: 'Variado (tropical a árido)',
      comunidadeBR: 'Pequena (10k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        residenteTemporal: {
          nome: 'Residente Temporal',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência renovável por até 4 anos.',
          requisitos: ['Renda mínima ~USD 2.500/mês ou', 'Saldo bancário ~USD 42.000 ou', 'Oferta de trabalho mexicana ou', 'Vínculo familiar'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Processo simples', 'Custo de vida baixo', 'Perto dos EUA', 'Cultura vibrante'],
          desvantagens: ['Questões de segurança em algumas áreas', 'Sistema de saúde variável']
        },
        residentePermanente: {
          nome: 'Residente Permanente',
          tipo: 'Residência permanente',
          descricao: 'Residência indefinida após 4 anos como temporal.',
          requisitos: ['4 anos como residente temporal ou', 'Aposentado com pensão ou', 'Familiar de mexicano ou', 'Sistema de pontos'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 200-400',
          taxaSucesso: '85%',
          vantagens: ['Permanente', 'Pode trabalhar livremente', 'Caminho para cidadania'],
          desvantagens: ['Precisa 4 anos como temporal', 'Documentação extensa']
        },
        nomadaDigitalMX: {
          nome: 'Visa de Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Residência temporal para trabalhadores remotos (em desenvolvimento).',
          requisitos: ['Trabalho remoto comprovado', 'Renda do exterior', 'Seguro saúde', 'Não trabalhar para empresa mexicana'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '85%',
          vantagens: ['Custo de vida baixo', 'Fuso horário EUA', 'Cultura rica', 'Comida incrível'],
          desvantagens: ['Programa ainda em definição', 'Segurança em algumas áreas']
        }
      },
      cidades: ['Cidade do México', 'Guadalajara', 'Monterrey', 'Cancún', 'Playa del Carmen', 'Mérida', 'Oaxaca']
    },
    argentina: {
      nome: 'Argentina',
      bandeira: '🇦🇷',
      capital: 'Buenos Aires',
      idioma: 'Espanhol',
      custoVida: 'Baixo (em dólar)',
      qualidadeVida: '7/10',
      seguranca: '6/10',
      clima: 'Variado (subtropical a subpolar)',
      comunidadeBR: 'Grande (50k+)',
      tempoResidencia: '2 anos para cidadania',
      rotas: {
        residenciaMercosur: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para cidadãos do Mercosul (inclui Brasil).',
          requisitos: ['Cidadão de país Mercosul', 'Certidão de nascimento', 'Atestado de antecedentes', 'Não precisa de visto prévio'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Processo muito simples para brasileiros', 'Cidadania em 2 anos', 'Custo baixíssimo', 'Cultura similar'],
          desvantagens: ['Instabilidade econômica', 'Inflação alta', 'Burocracia']
        },
        rentista: {
          nome: 'Visa Rentista',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de origem', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '90%',
          vantagens: ['Custo de vida baixo em dólar', 'Buenos Aires cosmopolita', 'Cultura europeia'],
          desvantagens: ['Economia instável', 'Inflação', 'Controle de câmbio']
        },
        inversionista: {
          nome: 'Visa Inversionista',
          tipo: 'Investimento',
          descricao: 'Visto para investidores em negócios argentinos.',
          requisitos: ['Investimento em negócio argentino', 'Plano de negócios', 'Geração de empregos', 'Capital mínimo variável'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '80%',
          vantagens: ['Oportunidades com dólar forte', 'Mão de obra qualificada', 'Acesso Mercosul'],
          desvantagens: ['Risco econômico', 'Burocracia', 'Impostos altos']
        }
      },
      cidades: ['Buenos Aires', 'Córdoba', 'Mendoza', 'Rosário', 'Bariloche', 'Mar del Plata']
    },
    chile: {
      nome: 'Chile',
      bandeira: '🇨🇱',
      capital: 'Santiago',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '7/10',
      seguranca: '7/10',
      clima: 'Variado (desértico a subpolar)',
      comunidadeBR: 'Média (20k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        visaTemporaria: {
          nome: 'Visa Temporaria',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência por motivos de trabalho, família ou estudos.',
          requisitos: ['Contrato de trabalho ou', 'Vínculo familiar ou', 'Matrícula em instituição ou', 'Recursos próprios'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-500',
          taxaSucesso: '85%',
          vantagens: ['Economia mais estável da região', 'Startup Chile famoso', 'Natureza espetacular'],
          desvantagens: ['Santiago cara para região', 'Terremotos frequentes']
        },
        visaResponsabilidad: {
          nome: 'Visa de Responsabilidad Democrática',
          tipo: 'Asilo/Refugiados',
          descricao: 'Visto especial para pessoas de países em crise.',
          requisitos: ['Nacionalidade de país elegível', 'Situação de vulnerabilidade', 'Documentação básica'],
          timeline: '1-2 meses',
          custoEstimado: 'Gratuito-USD 100',
          taxaSucesso: '70%',
          vantagens: ['Ajuda humanitária', 'Caminho para residência', 'Suporte governamental'],
          desvantagens: ['Só para países específicos', 'Temporário']
        },
        startupChile: {
          nome: 'Startup Chile (Tech Visa)',
          tipo: 'Empreendedorismo tech',
          descricao: 'Programa famoso de aceleração com visto incluído.',
          requisitos: ['Startup inovadora', 'Seleção competitiva', 'Equipe comprometida', 'Mudar para Chile durante programa'],
          timeline: '3-6 meses',
          custoEstimado: 'Gratuito (programa dá equity-free)',
          taxaSucesso: '20% (seletivo)',
          vantagens: ['Até USD 100k equity-free', 'Ecossistema startup', 'Networking Latam', 'Visto incluído'],
          desvantagens: ['Muito competitivo', 'Precisa relocar', 'Compromisso de tempo']
        }
      },
      cidades: ['Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'La Serena', 'Puerto Varas']
    },
    uruguai: {
      nome: 'Uruguai',
      bandeira: '🇺🇾',
      capital: 'Montevidéu',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Subtropical úmido',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: '3-5 anos para cidadania',
      rotas: {
        residenciaMercosulUY: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para brasileiros e cidadãos Mercosul.',
          requisitos: ['Cidadão do Mercosul', 'Certidão de nascimento apostilada', 'Atestado de antecedentes', 'Comprovante de renda ou trabalho'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Muito fácil para brasileiros', 'País estável', 'Qualidade de vida alta', 'Perto do Brasil'],
          desvantagens: ['Mercado pequeno', 'Custo de vida crescendo']
        },
        rentista: {
          nome: 'Residencia Rentista',
          tipo: 'Renda passiva',
          descricao: 'Residência para pessoas com renda passiva estável.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de 3+ anos de renda', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Regime fiscal territorial', 'Estabilidade', 'Próximo ao Brasil'],
          desvantagens: ['Mercado pequeno', 'Inverno frio']
        },
        residenciaFiscal: {
          nome: 'Residência Fiscal',
          tipo: 'Incentivo fiscal',
          descricao: 'Residência com benefícios fiscais para estrangeiros.',
          requisitos: ['Investimento imobiliário USD 380.000+ ou', 'Presença física 60+ dias/ano', 'Vínculo com Uruguai', 'Declaração de bens'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '85%',
          vantagens: ['Tax holiday de 11 anos', 'Só tributa renda uruguaia', 'Estabilidade jurídica'],
          desvantagens: ['Investimento alto para benefício pleno', 'Precisa presença física']
        }
      },
      cidades: ['Montevidéu', 'Punta del Este', 'Colonia del Sacramento', 'Salto', 'Maldonado']
    }
  };

  const sections = [
    { title: 'Dados Pessoais', icon: User, color: 'blue' },
    { title: 'Perfil Profissional', icon: Briefcase, color: 'green' },
    { title: 'Realizações', icon: Star, color: 'yellow' },
    { title: 'Formação Acadêmica', icon: GraduationCap, color: 'purple' },
    { title: 'Situação Empresarial', icon: Building2, color: 'orange' },
    { title: 'Idiomas', icon: Languages, color: 'cyan' },
    { title: 'Capacidade Financeira', icon: DollarSign, color: 'emerald' },
    { title: 'Composição Familiar', icon: Users, color: 'pink' },
    { title: 'Objetivos de Vida', icon: Target, color: 'red' },
    { title: 'Preferências de Destino', icon: MapPin, color: 'indigo' },
    { title: 'Timeline', icon: Clock, color: 'slate' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmitAndAnalyze();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Função de cálculo de score
  const calculateDetailedScore = () => {
    // Inicializar scores para todos os 22 países
    const allCountries = [
      'portugal', 'alemanha', 'eua', 'espanha', 'holanda', 'canada',
      'irlanda', 'uk', 'italia', 'franca', 'belgica', 'austria', 'suica',
      'australia', 'novaZelandia', 'emirados', 'singapura', 'japao',
      'mexico', 'argentina', 'chile', 'uruguai'
    ];
    
    let scores = {};
    allCountries.forEach(country => {
      scores[country] = { total: 0, viabilidade: 0, alinhamento: 0, timeline: 0, custoBeneficio: 0, potencial: 0, rotas: {} };
    });

    // ===== VIABILIDADE (35%) =====
    
    // Área Tech - países com melhores programas tech
    if (formData.areaAtuacao === 'tech') {
      scores.portugal.viabilidade += 35; scores.alemanha.viabilidade += 35;
      scores.holanda.viabilidade += 35; scores.irlanda.viabilidade += 35;
      scores.eua.viabilidade += 30; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 30; scores.australia.viabilidade += 28;
      scores.singapura.viabilidade += 28; scores.espanha.viabilidade += 25;
      scores.franca.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.austria.viabilidade += 22; scores.belgica.viabilidade += 22;
      scores.novaZelandia.viabilidade += 22; scores.japao.viabilidade += 20;
      scores.emirados.viabilidade += 20; scores.chile.viabilidade += 18;
      scores.italia.viabilidade += 18; scores.mexico.viabilidade += 15;
      scores.argentina.viabilidade += 12; scores.uruguai.viabilidade += 12;
      
      // Rotas específicas para tech
      scores.portugal.rotas.techVisa = 95; scores.portugal.rotas.d8 = 85;
      scores.alemanha.rotas.blueCard = 90; scores.holanda.rotas.kennismigrant = 90;
      scores.irlanda.rotas.criticalSkills = 90; scores.uk.rotas.skilledWorker = 85;
      scores.uk.rotas.globalTalent = 80; scores.australia.rotas.skilledIndependent = 85;
      scores.singapura.rotas.employmentPass = 80; scores.canada.rotas.expressEntry = 85;
    }
    
    // Área Saúde
    if (formData.areaAtuacao === 'saude') {
      scores.canada.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.uk.viabilidade += 25;
      scores.novaZelandia.viabilidade += 25; scores.irlanda.viabilidade += 22;
      scores.portugal.viabilidade += 20; scores.eua.viabilidade += 20;
    }
    
    // Área Engenharia
    if (formData.areaAtuacao === 'engenharia') {
      scores.alemanha.viabilidade += 30; scores.canada.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.eua.viabilidade += 25;
      scores.emirados.viabilidade += 25; scores.singapura.viabilidade += 22;
    }
    
    // Área Finanças
    if (formData.areaAtuacao === 'financas') {
      scores.uk.viabilidade += 30; scores.singapura.viabilidade += 30;
      scores.suica.viabilidade += 28; scores.emirados.viabilidade += 28;
      scores.holanda.viabilidade += 25; scores.eua.viabilidade += 25;
    }
    
    // Experiência profissional
    const expMap = { '0-2': 5, '3-5': 15, '6-8': 25, '9-12': 35, '13-15': 40, '16-20': 45, '20+': 50 };
    const expScore = expMap[formData.anosExperiencia] || 0;
    Object.keys(scores).forEach(country => { scores[country].viabilidade += expScore * 0.5; });
    
    if (['13-15', '16-20', '20+'].includes(formData.anosExperiencia)) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.australia.viabilidade += 12; scores.singapura.viabilidade += 10;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 20;
    }

    // Formação acadêmica
    if (formData.nivelFormacao === 'mestrado') {
      scores.eua.viabilidade += 20; scores.alemanha.viabilidade += 18;
      scores.canada.viabilidade += 20; scores.australia.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.singapura.viabilidade += 15;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 25;
    }
    if (['doutorado', 'posDoutorado'].includes(formData.nivelFormacao)) {
      scores.eua.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.canada.viabilidade += 30; scores.uk.viabilidade += 28;
      scores.australia.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 30;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 25;
    }

    // Realizações (importante para EUA, UK, Austrália)
    if (formData.possuiPremios !== 'nao' && formData.possuiPremios) {
      scores.eua.viabilidade += 20; scores.uk.viabilidade += 18;
      scores.australia.viabilidade += 15;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 20;
      scores.eua.rotas.o1a = (scores.eua.rotas.o1a || 40) + 20;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 20;
    }
    if (formData.possuiPublicacoes !== 'nao' && formData.possuiPublicacoes) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 10;
    }

    // IDIOMAS
    if (['fluente', 'nativo'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 25; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 25; scores.irlanda.viabilidade += 25;
      scores.australia.viabilidade += 28; scores.novaZelandia.viabilidade += 28;
      scores.singapura.viabilidade += 22; scores.emirados.viabilidade += 20;
      scores.holanda.viabilidade += 20; scores.alemanha.viabilidade += 15;
    } else if (['avancado'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 15; scores.canada.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.irlanda.viabilidade += 15;
      scores.australia.viabilidade += 18; scores.novaZelandia.viabilidade += 18;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelEspanhol)) {
      scores.espanha.viabilidade += 30; scores.mexico.viabilidade += 25;
      scores.argentina.viabilidade += 25; scores.chile.viabilidade += 25;
      scores.uruguai.viabilidade += 25;
      scores.espanha.rotas.nomadaDigital = 90;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelAlemao)) {
      scores.alemanha.viabilidade += 25; scores.austria.viabilidade += 25;
      scores.suica.viabilidade += 20;
    }

    if (['fluente', 'avancado'].includes(formData.nivelFrances)) {
      scores.franca.viabilidade += 30; scores.canada.viabilidade += 15;
      scores.belgica.viabilidade += 20; scores.suica.viabilidade += 15;
    }

    // Capacidade financeira para Golden Visa
    if (['1m-2m', '2m-5m', 'acima5m', 'acima2m'].includes(formData.patrimonioLiquido)) {
      scores.portugal.rotas.goldenVisa = 95; scores.eua.rotas.eb5 = 90;
      scores.emirados.rotas.goldenVisaUAE = 90;
    }
    if (['interesse', 'prioridade'].includes(formData.disposicaoGoldenVisa)) {
      scores.portugal.viabilidade += 20; scores.espanha.viabilidade += 15;
      scores.emirados.viabilidade += 20;
    }

    // Empresa própria
    if (formData.possuiEmpresa && !['nao', 'encerrada'].includes(formData.possuiEmpresa)) {
      scores.holanda.rotas.startupVisa = 80; scores.canada.rotas.startupVisa = 75;
      scores.uk.rotas.innovatorFounder = 75; scores.chile.rotas.startupChile = 85;
      scores.singapura.rotas.entrePass = 70;
      if (['filial', 'exporta'].includes(formData.atuacaoInternacional)) {
        scores.eua.rotas.l1a = 85; scores.eua.viabilidade += 20;
      }
    }

    // ===== ALINHAMENTO (25%) =====
    
    // Preferências declaradas de países
    allCountries.forEach(country => {
      if (formData.paisesInteresse.includes(country)) {
        scores[country].alinhamento += 40;
      }
    });
    // Aliases para preferências
    if (formData.paisesInteresse.includes('uk')) scores.uk.alinhamento += 40;
    if (formData.paisesInteresse.includes('uae') || formData.paisesInteresse.includes('dubai')) scores.emirados.alinhamento += 40;
    if (formData.paisesInteresse.includes('nz')) scores.novaZelandia.alinhamento += 40;

    // Clima
    if (['mediterraneo', 'tropical'].includes(formData.preferenciaClima)) {
      scores.portugal.alinhamento += 25; scores.espanha.alinhamento += 25;
      scores.italia.alinhamento += 25; scores.emirados.alinhamento += 20;
      scores.singapura.alinhamento += 18; scores.australia.alinhamento += 20;
      scores.mexico.alinhamento += 22;
    }
    if (['temperado', 'frio'].includes(formData.preferenciaClima)) {
      scores.alemanha.alinhamento += 20; scores.canada.alinhamento += 22;
      scores.uk.alinhamento += 18; scores.irlanda.alinhamento += 18;
      scores.holanda.alinhamento += 18; scores.belgica.alinhamento += 18;
      scores.austria.alinhamento += 20; scores.suica.alinhamento += 20;
      scores.novaZelandia.alinhamento += 18; scores.japao.alinhamento += 18;
      scores.chile.alinhamento += 15; scores.argentina.alinhamento += 15;
    }

    // Preferência de idioma
    if (formData.preferenciaIdiomaPais === 'portugues') {
      scores.portugal.alinhamento += 30;
    }
    if (formData.preferenciaIdiomaPais === 'espanhol') {
      scores.espanha.alinhamento += 30; scores.mexico.alinhamento += 25;
      scores.argentina.alinhamento += 25; scores.chile.alinhamento += 25;
      scores.uruguai.alinhamento += 25;
    }
    if (formData.preferenciaIdiomaPais === 'ingles') {
      scores.eua.alinhamento += 25; scores.canada.alinhamento += 25;
      scores.uk.alinhamento += 25; scores.irlanda.alinhamento += 25;
      scores.australia.alinhamento += 25; scores.novaZelandia.alinhamento += 25;
      scores.singapura.alinhamento += 20; scores.emirados.alinhamento += 18;
    }

    // Comunidade brasileira
    if (formData.importanciaComunidadeBR === 'essencial') {
      scores.portugal.alinhamento += 25; scores.eua.alinhamento += 25;
      scores.japao.alinhamento += 22; scores.uk.alinhamento += 18;
      scores.espanha.alinhamento += 15; scores.argentina.alinhamento += 15;
      scores.uruguai.alinhamento += 15;
    }

    // Família com filhos
    if (formData.numeroFilhos && formData.numeroFilhos !== '0') {
      scores.portugal.alinhamento += 15; scores.espanha.alinhamento += 15;
      scores.canada.alinhamento += 20; scores.australia.alinhamento += 18;
      scores.novaZelandia.alinhamento += 18; scores.alemanha.alinhamento += 15;
    }

    // ===== TIMELINE (15%) =====
    
    // Processos rápidos (até 6 meses)
    if (['imediato', '6meses'].includes(formData.prazoIdeal)) {
      scores.holanda.timeline += 45; scores.emirados.timeline += 45;
      scores.portugal.timeline += 40; scores.alemanha.timeline += 38;
      scores.irlanda.timeline += 38; scores.uk.timeline += 35;
      scores.espanha.timeline += 35; scores.mexico.timeline += 40;
      scores.argentina.timeline += 45; scores.uruguai.timeline += 45;
      scores.singapura.timeline += 35;
      scores.eua.timeline += 15; scores.canada.timeline += 18;
      scores.australia.timeline += 20; scores.novaZelandia.timeline += 22;
    }
    // Médio prazo (1-2 anos)
    if (['1ano', '2anos'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 35; scores.canada.timeline += 38;
      scores.australia.timeline += 35; scores.novaZelandia.timeline += 35;
      scores.uk.timeline += 32;
    }
    // Longo prazo (3+ anos)
    if (['3anos', 'semPressa'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 40; scores.canada.timeline += 40;
      scores.suica.timeline += 35;
    }

    // ===== CUSTO-BENEFÍCIO (15%) =====
    
    // Orçamento baixo
    if (['ate20k', '20k-50k'].includes(formData.capacidadeInvestimento)) {
      scores.portugal.custoBeneficio += 35; scores.alemanha.custoBeneficio += 40;
      scores.espanha.custoBeneficio += 35; scores.italia.custoBeneficio += 35;
      scores.argentina.custoBeneficio += 45; scores.mexico.custoBeneficio += 42;
      scores.uruguai.custoBeneficio += 38; scores.chile.custoBeneficio += 35;
    }
    // Orçamento médio
    if (['50k-100k', '100k-200k'].includes(formData.capacidadeInvestimento)) {
      scores.canada.custoBeneficio += 35; scores.australia.custoBeneficio += 32;
      scores.irlanda.custoBeneficio += 32; scores.uk.custoBeneficio += 30;
      scores.holanda.custoBeneficio += 32;
    }
    // Orçamento alto
    if (['200k-500k', '500k-1m', 'acima1m'].includes(formData.capacidadeInvestimento)) {
      scores.eua.custoBeneficio += 40; scores.portugal.custoBeneficio += 40;
      scores.emirados.custoBeneficio += 42; scores.singapura.custoBeneficio += 38;
      scores.suica.custoBeneficio += 35;
    }

    // ===== POTENCIAL LONGO PRAZO (10%) =====
    
    // Tempo para cidadania (quanto mais rápido, mais pontos)
    scores.argentina.potencial += 45; // 2 anos
    scores.espanha.potencial += 45; // 2 anos para BR
    scores.canada.potencial += 40; // 3 anos
    scores.chile.potencial += 35; // 5 anos
    scores.uruguai.potencial += 38; // 3-5 anos
    scores.australia.potencial += 38; // 4 anos
    scores.portugal.potencial += 32; // 5 anos
    scores.eua.potencial += 32; // 5 anos
    scores.uk.potencial += 30; // 5 anos
    scores.irlanda.potencial += 30; // 5 anos
    scores.holanda.potencial += 28; // 5 anos
    scores.novaZelandia.potencial += 32; // 5 anos
    scores.franca.potencial += 28; // 5 anos
    scores.belgica.potencial += 28; // 5 anos
    scores.alemanha.potencial += 22; // 6-8 anos
    scores.suica.potencial += 15; // 10-12 anos
    scores.austria.potencial += 18; // 10 anos
    scores.italia.potencial += 20; // 10 anos (3-4 com ascendência)
    scores.singapura.potencial += 25; // 4 anos (2 PR + 2)
    scores.japao.potencial += 20; // 5-10 anos
    scores.emirados.potencial += 10; // Sem cidadania
    scores.mexico.potencial += 30; // 5 anos

    // Dupla cidadania europeia já existente
    if (formData.possuiDuplaCidadania && !['nao'].includes(formData.possuiDuplaCidadania)) {
      if (['italiana', 'portuguesa', 'alema', 'espanhola', 'outraUE'].includes(formData.possuiDuplaCidadania)) {
        // Cidadão UE pode morar/trabalhar em qualquer país da UE
        scores.portugal.potencial += 50; scores.alemanha.potencial += 50;
        scores.espanha.potencial += 50; scores.holanda.potencial += 50;
        scores.franca.potencial += 50; scores.italia.potencial += 50;
        scores.belgica.potencial += 50; scores.austria.potencial += 50;
        scores.irlanda.potencial += 50;
        // Viabilidade também aumenta muito
        scores.portugal.viabilidade += 40; scores.alemanha.viabilidade += 40;
        scores.espanha.viabilidade += 40; scores.holanda.viabilidade += 40;
        scores.franca.viabilidade += 40; scores.italia.viabilidade += 40;
        scores.belgica.viabilidade += 40; scores.austria.viabilidade += 40;
        scores.irlanda.viabilidade += 40;
      }
    }

    // ===== CALCULAR TOTAIS =====
    Object.keys(scores).forEach(country => {
      const s = scores[country];
      s.total = Math.round(
        (s.viabilidade * 0.35) + (s.alinhamento * 0.25) +
        (s.timeline * 0.15) + (s.custoBeneficio * 0.15) + (s.potencial * 0.10)
      );
      s.total = Math.min(s.total, 100);
      Object.keys(s.rotas).forEach(rota => { s.rotas[rota] = Math.min(s.rotas[rota], 100); });
    });

    return scores;
  };

  const getBestRoutes = (countryKey, scores) => {
    const calculatedRoutes = scores[countryKey]?.rotas || {};
    const countryRoutes = countryData[countryKey]?.rotas || {};
    
    // Combinar rotas calculadas com todas as rotas disponíveis do país
    const allRoutes = Object.keys(countryRoutes).map(key => ({
      key,
      score: calculatedRoutes[key] || 50, // Score base de 50 se não calculado
      ...countryRoutes[key]
    }));
    
    // Ordenar por score e retornar top 3
    return allRoutes
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(r => r.nome);
  };

  // Submeter dados e mostrar análise
  const handleSubmitAndAnalyze = async () => {
    setIsSubmitting(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ 
        key, 
        name: countryData[key]?.nome,
        score: data.total,
        ...data, 
        info: countryData[key] 
      }));
    
    const bestRoutes = getBestRoutes(topCountries[0].key, scores);
    
    const analysisResults = {
      topCountries,
      recommendedRoute: bestRoutes[0]?.nome || 'Consultar especialista',
      scores
    };

    // Enviar dados para email e sheets
    try {
      const results = await submitQuestionnaireData(formData, analysisResults);
      setSubmissionStatus(results);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSubmissionStatus({ email: { success: false }, sheets: { success: false } });
    }

    setIsSubmitting(false);
    setShowAnalysis(true);
  };

  const renderRadio = (label, field, options, required = false, columns = 1) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {options.map(opt => (
          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
            formData[field] === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="radio" name={field} value={opt.value} checked={formData[field] === opt.value}
              onChange={(e) => handleChange(field, e.target.value)} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              formData[field] === opt.value ? 'border-blue-500' : 'border-gray-300'
            }`}>
              {formData[field] === opt.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderCheckbox = (label, field, options, columns = 2) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {options.map(opt => (
          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
            formData[field].includes(opt.value) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="checkbox" checked={formData[field].includes(opt.value)}
              onChange={() => handleMultiSelect(field, opt.value)} className="sr-only" />
            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
              formData[field].includes(opt.value) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {formData[field].includes(opt.value) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderInput = (label, field, placeholder = '', required = false) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type="text" value={formData[field]} onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            {renderInput('Nome Completo', 'nomeCompleto', 'Seu nome completo', true)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput('E-mail', 'email', 'seu@email.com', true)}
              {renderInput('Telefone/WhatsApp', 'telefone', '+55 11 99999-9999', true)}
            </div>
            {renderRadio('Faixa Etária', 'faixaEtaria', [
              { value: '18-25', label: '18 a 25 anos' }, { value: '26-30', label: '26 a 30 anos' },
              { value: '31-35', label: '31 a 35 anos' }, { value: '36-40', label: '36 a 40 anos' },
              { value: '41-45', label: '41 a 45 anos' }, { value: '46-50', label: '46 a 50 anos' },
              { value: '51-55', label: '51 a 55 anos' }, { value: '56+', label: '56 anos ou mais' }
            ], true, 2)}
            {renderRadio('Estado Civil', 'estadoCivil', [
              { value: 'solteiro', label: 'Solteiro(a)' }, { value: 'casado', label: 'Casado(a)' },
              { value: 'uniao', label: 'União Estável' }, { value: 'divorciado', label: 'Divorciado(a)' }
            ], true, 2)}
            {renderRadio('Possui dupla cidadania?', 'possuiDuplaCidadania', [
              { value: 'nao', label: 'Não' }, { value: 'italiana', label: 'Italiana' },
              { value: 'portuguesa', label: 'Portuguesa' }, { value: 'alema', label: 'Alemã' },
              { value: 'espanhola', label: 'Espanhola' }, { value: 'outraUE', label: 'Outra UE' },
              { value: 'emProcesso', label: 'Em processo' }
            ], false, 2)}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {renderRadio('Área de Atuação', 'areaAtuacao', [
              { value: 'tech', label: '💻 Tecnologia / TI' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'engenharia', label: '⚙️ Engenharia' }, { value: 'financas', label: '💰 Finanças' },
              { value: 'marketing', label: '📢 Marketing' }, { value: 'juridico', label: '⚖️ Jurídico' },
              { value: 'educacao', label: '📚 Educação' }, { value: 'negocios', label: '📊 Negócios' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderRadio('Nível do Cargo', 'nivelCargo', [
              { value: 'junior', label: 'Júnior' }, { value: 'pleno', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' }, { value: 'lead', label: 'Tech Lead' },
              { value: 'gerente', label: 'Gerente' }, { value: 'diretor', label: 'Diretor' },
              { value: 'cLevel', label: 'C-Level' }, { value: 'empresario', label: 'Empresário' }
            ], true, 2)}
            {renderRadio('Anos de Experiência', 'anosExperiencia', [
              { value: '0-2', label: '0 a 2 anos' }, { value: '3-5', label: '3 a 5 anos' },
              { value: '6-8', label: '6 a 8 anos' }, { value: '9-12', label: '9 a 12 anos' },
              { value: '13-15', label: '13 a 15 anos' }, { value: '16-20', label: '16 a 20 anos' },
              { value: '20+', label: 'Mais de 20 anos' }
            ], true, 2)}
            {renderRadio('Gestão de equipes', 'gestaoEquipe', [
              { value: 'nao', label: 'Não' }, { value: 'pequena', label: '1-5 pessoas' },
              { value: 'media', label: '6-15 pessoas' }, { value: 'grande', label: '16-50 pessoas' },
              { value: 'multiplas', label: '50+ pessoas' }
            ], true, 2)}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800"><AlertCircle className="inline w-4 h-4 mr-1" />
                Crucial para vistos O-1A, EB-1A e Global Talent.</p>
            </div>
            {renderRadio('Prêmios profissionais?', 'possuiPremios', [
              { value: 'nao', label: 'Não' }, { value: '1-2', label: '1 a 2' },
              { value: '3-5', label: '3 a 5' }, { value: '6+', label: '6 ou mais' }
            ], true, 2)}
            {renderRadio('Publicações?', 'possuiPublicacoes', [
              { value: 'nao', label: 'Não' }, { value: '1-3', label: '1 a 3' },
              { value: '4-10', label: '4 a 10' }, { value: '10+', label: 'Mais de 10' }
            ], true, 2)}
            {renderRadio('Patentes?', 'possuiPatentes', [
              { value: 'nao', label: 'Não' }, { value: '1', label: '1' },
              { value: '2-3', label: '2 a 3' }, { value: '4+', label: '4+' }
            ], true, 2)}
            {renderRadio('Palestras?', 'possuiPalestras', [
              { value: 'nao', label: 'Não' }, { value: '1-5', label: '1 a 5' },
              { value: '6-15', label: '6 a 15' }, { value: '15+', label: '15+' }
            ], true, 2)}
            {renderRadio('Mídia?', 'aparicoesMidia', [
              { value: 'nao', label: 'Nenhuma' }, { value: 'poucas', label: '1 a 3' },
              { value: 'varias', label: '4 a 10' }, { value: 'muitas', label: '10+' }
            ], true, 2)}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderRadio('Maior Formação', 'nivelFormacao', [
              { value: 'medio', label: 'Ensino Médio' }, { value: 'tecnico', label: 'Técnico' },
              { value: 'graduacao', label: 'Graduação' }, { value: 'posGraduacao', label: 'Pós/MBA' },
              { value: 'mestrado', label: 'Mestrado' }, { value: 'doutorado', label: 'Doutorado' },
              { value: 'posDoutorado', label: 'Pós-Doutorado' }
            ], true)}
            {renderRadio('Área do Curso', 'areaCurso', [
              { value: 'exatas', label: 'Exatas (Eng, Comp, Mat)' },
              { value: 'biologicas', label: 'Biológicas (Med, Bio)' },
              { value: 'humanas', label: 'Humanas (Dir, Psi, Adm)' },
              { value: 'negocios', label: 'Negócios e Gestão' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderCheckbox('Certificações', 'certificacoes', [
              { value: 'aws', label: 'AWS' }, { value: 'gcp', label: 'Google Cloud' },
              { value: 'azure', label: 'Azure' }, { value: 'pmp', label: 'PMP' },
              { value: 'scrum', label: 'Scrum' }, { value: 'idioma', label: 'Idioma' },
              { value: 'nenhuma', label: 'Nenhuma' }
            ], 2)}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {renderRadio('Possui empresa?', 'possuiEmpresa', [
              { value: 'nao', label: 'Não' }, { value: 'mei', label: 'MEI' },
              { value: 'me', label: 'ME/EPP' }, { value: 'ltda', label: 'LTDA' },
              { value: 'socio', label: 'Sócio minoritário' }
            ], true, 2)}
            {formData.possuiEmpresa && !['nao'].includes(formData.possuiEmpresa) && (
              <>
                {renderRadio('Faturamento Anual', 'faturamentoAnual', [
                  { value: 'ate81k', label: 'Até R$81k' }, { value: '81k-360k', label: 'R$81k-360k' },
                  { value: '360k-1m', label: 'R$360k-1M' }, { value: '1m-5m', label: 'R$1M-5M' },
                  { value: 'acima5m', label: 'Acima R$5M' }
                ], false, 2)}
                {renderRadio('Atuação Internacional', 'atuacaoInternacional', [
                  { value: 'nao', label: 'Não' }, { value: 'exporta', label: 'Exporta' },
                  { value: 'clientes', label: 'Clientes no exterior' }, { value: 'filial', label: 'Filial no exterior' }
                ], false, 2)}
              </>
            )}
            {renderRadio('Interesse em empreender no exterior?', 'interesseEmpreenderExterior', [
              { value: 'nao', label: 'Não' }, { value: 'talvez', label: 'Talvez' },
              { value: 'sim', label: 'Sim' }, { value: 'jaTenho', label: 'Já tenho' }
            ], true, 2)}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {renderRadio('Nível de Inglês', 'nivelIngles', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }, { value: 'nativo', label: 'Nativo' }
            ], true)}
            {renderRadio('Nível de Espanhol', 'nivelEspanhol', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Nível de Alemão', 'nivelAlemao', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Disposição para aprender?', 'disposicaoAprender', [
              { value: 'nao', label: 'Prefiro país onde já falo' },
              { value: 'basico', label: 'Aprenderia o básico' },
              { value: 'sim', label: 'Sim, disposto' }
            ], true)}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {renderRadio('Renda Mensal Familiar', 'rendaMensalFamiliar', [
              { value: 'ate5k', label: 'Até R$5k' }, { value: '5k-10k', label: 'R$5k-10k' },
              { value: '10k-20k', label: 'R$10k-20k' }, { value: '20k-35k', label: 'R$20k-35k' },
              { value: '35k-50k', label: 'R$35k-50k' }, { value: '50k-80k', label: 'R$50k-80k' },
              { value: 'acima80k', label: 'Acima R$80k' }
            ], true, 2)}
            {renderRadio('Patrimônio Líquido', 'patrimonioLiquido', [
              { value: 'ate50k', label: 'Até R$50k' }, { value: '50k-100k', label: 'R$50k-100k' },
              { value: '100k-250k', label: 'R$100k-250k' }, { value: '250k-500k', label: 'R$250k-500k' },
              { value: '500k-1m', label: 'R$500k-1M' }, { value: '1m-2m', label: 'R$1M-2M' },
              { value: 'acima2m', label: 'Acima R$2M' }
            ], true, 2)}
            {renderRadio('Investimento no processo', 'capacidadeInvestimento', [
              { value: 'ate20k', label: 'Até R$20k' }, { value: '20k-50k', label: 'R$20k-50k' },
              { value: '50k-100k', label: 'R$50k-100k' }, { value: '100k-200k', label: 'R$100k-200k' },
              { value: '200k-500k', label: 'R$200k-500k' }, { value: '500k-1m', label: 'R$500k-1M' },
              { value: 'acima1m', label: 'Acima R$1M' }
            ], true, 2)}
            {renderRadio('Interesse em Golden Visa/EB-5?', 'disposicaoGoldenVisa', [
              { value: 'nao', label: 'Não' }, { value: 'considero', label: 'Consideraria' },
              { value: 'interesse', label: 'Tenho interesse' }, { value: 'prioridade', label: 'Prioridade' }
            ], true, 2)}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {(formData.estadoCivil === 'casado' || formData.estadoCivil === 'uniao') && (
              <>
                {renderRadio('Área do Cônjuge', 'areaConjuge', [
                  { value: 'tech', label: 'Tecnologia' }, { value: 'saude', label: 'Saúde' },
                  { value: 'educacao', label: 'Educação' }, { value: 'outro', label: 'Outro' },
                  { value: 'na', label: 'Não trabalha' }
                ], false, 3)}
                {renderRadio('Flexibilidade do Cônjuge', 'flexibilidadeConjuge', [
                  { value: 'total', label: 'Total' }, { value: 'parcial', label: 'Parcial' },
                  { value: 'resistente', label: 'Resistente' }
                ], true, 3)}
              </>
            )}
            {renderRadio('Número de Filhos', 'numeroFilhos', [
              { value: '0', label: 'Nenhum' }, { value: '1', label: '1' },
              { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4+', label: '4+' }
            ], true, 3)}
            {formData.numeroFilhos && formData.numeroFilhos !== '0' && (
              renderCheckbox('Faixa Etária dos Filhos', 'faixaEtariaFilhos', [
                { value: 'bebe', label: '0-2 anos' }, { value: 'preEscola', label: '3-5 anos' },
                { value: 'fundamental1', label: '6-10 anos' }, { value: 'fundamental2', label: '11-14 anos' },
                { value: 'medio', label: '15-17 anos' }, { value: 'adulto', label: '18+' }
              ], 2)
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {renderCheckbox('Motivações (até 5)', 'motivacaoPrincipal', [
              { value: 'seguranca', label: '🛡️ Segurança' }, { value: 'qualidadeVida', label: '🌟 Qualidade de vida' },
              { value: 'carreira', label: '📈 Crescimento profissional' }, { value: 'salario', label: '💰 Aumento de renda' },
              { value: 'educacaoFilhos', label: '🎓 Educação dos filhos' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'estabilidade', label: '🏛️ Estabilidade' }, { value: 'cidadania', label: '🇪🇺 Cidadania UE' },
              { value: 'empreender', label: '🚀 Empreender' }, { value: 'aventura', label: '✈️ Nova experiência' }
            ], 2)}
            {renderRadio('Objetivo de Carreira', 'objetivoCarreira', [
              { value: 'mesmaArea', label: 'Continuar na área' }, { value: 'crescer', label: 'Crescer' },
              { value: 'mudarArea', label: 'Mudar área' }, { value: 'empreender', label: 'Empreender' },
              { value: 'equilibrio', label: 'Mais equilíbrio' }
            ], true)}
            {renderRadio('Expectativa Salarial', 'expectativaSalarial', [
              { value: 'menor', label: 'Aceito ganhar menos' }, { value: 'igual', label: 'Manter' },
              { value: 'maior', label: 'Ganhar mais' }, { value: 'muitoMaior', label: 'Dobrar' }
            ], true, 2)}
            {renderRadio('Plano de Retorno', 'planoRetorno', [
              { value: 'nunca', label: 'Não pretendo voltar' }, { value: 'aposentadoria', label: 'Na aposentadoria' },
              { value: 'temporario', label: 'Alguns anos' }, { value: 'incerto', label: 'Não sei' }
            ], true, 2)}
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            {renderCheckbox('Países de Interesse (selecione quantos quiser)', 'paisesInteresse', [
              // Europa
              { value: 'portugal', label: '🇵🇹 Portugal' }, { value: 'espanha', label: '🇪🇸 Espanha' },
              { value: 'alemanha', label: '🇩🇪 Alemanha' }, { value: 'holanda', label: '🇳🇱 Holanda' },
              { value: 'irlanda', label: '🇮🇪 Irlanda' }, { value: 'uk', label: '🇬🇧 Reino Unido' },
              { value: 'italia', label: '🇮🇹 Itália' }, { value: 'franca', label: '🇫🇷 França' },
              { value: 'belgica', label: '🇧🇪 Bélgica' }, { value: 'austria', label: '🇦🇹 Áustria' },
              { value: 'suica', label: '🇨🇭 Suíça' },
              // Américas
              { value: 'eua', label: '🇺🇸 Estados Unidos' }, { value: 'canada', label: '🇨🇦 Canadá' },
              { value: 'mexico', label: '🇲🇽 México' }, { value: 'argentina', label: '🇦🇷 Argentina' },
              { value: 'chile', label: '🇨🇱 Chile' }, { value: 'uruguai', label: '🇺🇾 Uruguai' },
              // Oceania
              { value: 'australia', label: '🇦🇺 Austrália' }, { value: 'novaZelandia', label: '🇳🇿 Nova Zelândia' },
              // Ásia/Oriente
              { value: 'emirados', label: '🇦🇪 Emirados (Dubai)' }, { value: 'singapura', label: '🇸🇬 Singapura' },
              { value: 'japao', label: '🇯🇵 Japão' },
              // Aberto
              { value: 'aberto', label: '🌍 Aberto a sugestões' }
            ], 3)}
            {renderRadio('Preferência de Clima', 'preferenciaClima', [
              { value: 'tropical', label: '☀️ Quente' }, { value: 'mediterraneo', label: '🌅 Mediterrâneo' },
              { value: 'temperado', label: '🍂 Temperado' }, { value: 'frio', label: '❄️ Frio OK' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Comunidade Brasileira', 'importanciaComunidadeBR', [
              { value: 'essencial', label: 'Essencial' }, { value: 'importante', label: 'Importante' },
              { value: 'indiferente', label: 'Indiferente' }, { value: 'evitar', label: 'Prefiro evitar' }
            ], true, 2)}
            {renderRadio('Preferência de Idioma', 'preferenciaIdiomaPais', [
              { value: 'portugues', label: 'Lusófono' }, { value: 'espanhol', label: 'Hispânico' },
              { value: 'ingles', label: 'Anglófono' }, { value: 'aprender', label: 'Disposto aprender' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Custo de Vida', 'toleranciaCustoVida', [
              { value: 'baixo', label: 'Prefiro baixo' }, { value: 'medio', label: 'Médio OK' },
              { value: 'alto', label: 'Alto OK' }
            ], true, 3)}
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            {renderRadio('Prazo para Mudança', 'prazoIdeal', [
              { value: 'imediato', label: 'Imediato (3 meses)' }, { value: '6meses', label: 'Até 6 meses' },
              { value: '1ano', label: '6m a 1 ano' }, { value: '2anos', label: '1 a 2 anos' },
              { value: '3anos', label: '2 a 3 anos' }, { value: 'semPressa', label: 'Sem pressa' }
            ], true, 2)}
            {renderRadio('Flexibilidade', 'flexibilidadePrazo', [
              { value: 'rigido', label: 'Rígido' }, { value: 'flexivel', label: 'Flexível' },
              { value: 'muitoFlexivel', label: 'Muito flexível' }
            ], true, 3)}
            {renderRadio('Situação no Brasil', 'situacaoAtualBrasil', [
              { value: 'estavel', label: 'Estável' }, { value: 'estavelInsatisfeito', label: 'Estável mas insatisfeito' },
              { value: 'transicao', label: 'Em transição' }, { value: 'urgente', label: 'Urgente' }
            ], true, 2)}
            {renderRadio('Já iniciou processo?', 'jaIniciouProcesso', [
              { value: 'nao', label: 'Não' }, { value: 'pesquisando', label: 'Pesquisando' },
              { value: 'documentos', label: 'Reunindo docs' }, { value: 'processoAtivo', label: 'Processo ativo' }
            ], true, 2)}
            {renderRadio('Conhecimento sobre Rotas', 'conhecimentoRotas', [
              { value: 'nenhum', label: 'Nenhum' }, { value: 'basico', label: 'Básico' },
              { value: 'moderado', label: 'Moderado' }, { value: 'avancado', label: 'Avançado' }
            ], true, 2)}
          </div>
        );

      default:
        return null;
    }
  };

  // RENDER ANÁLISE
  const renderAnalysis = () => {
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    const topCountry = topCountries[0];
    const bestRoutes = getBestRoutes(topCountry.key, scores);

    return (
      <div className="space-y-6">
        {/* Header com status de envio */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Relatório Geofitting</h2>
          <p className="text-gray-600 mt-2">Análise completa para {formData.nomeCompleto || 'Cliente'}</p>
          
          {/* Status de envio */}
          {submissionStatus && (
            <div className="flex justify-center gap-4 mt-4">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.email?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Mail className="w-4 h-4 mr-1" />
                {submissionStatus.email?.success ? 'Email enviado' : 'Email pendente'}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.sheets?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Database className="w-4 h-4 mr-1" />
                {submissionStatus.sheets?.success ? 'Dados salvos' : 'Dados pendentes'}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center bg-gray-100 p-2 rounded-xl">
          {[
            { id: 'resumo', label: 'Resumo', icon: FileText },
            { id: 'destinos', label: 'Destinos', icon: MapPin },
            { id: 'rotas', label: 'Rotas', icon: Plane },
            { id: 'comparativo', label: 'Comparativo', icon: TrendingUp }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600 hover:text-gray-800'
              }`}>
              <tab.icon className="w-4 h-4 mr-2" />{tab.label}
            </button>
          ))}
        </div>

        {/* Tab Resumo */}
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Sumário Executivo</h3>
              <p className="text-blue-100 leading-relaxed">
                Com base na análise do seu perfil, identificamos <strong>{topCountry.info?.nome}</strong> como 
                seu destino mais compatível, com score de <strong>{topCountry.total}%</strong>. 
                A rota recomendada é <strong>{bestRoutes[0]?.nome || 'Tech Visa'}</strong>, 
                com timeline estimada de <strong>{bestRoutes[0]?.timeline || '3-6 meses'}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <p className="text-xs text-gray-500">Área</p>
                <p className="font-bold capitalize">{formData.areaAtuacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <p className="text-xs text-gray-500">Experiência</p>
                <p className="font-bold">{formData.anosExperiencia || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <p className="text-xs text-gray-500">Formação</p>
                <p className="font-bold capitalize">{formData.nivelFormacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500">
                <p className="text-xs text-gray-500">Timeline</p>
                <p className="font-bold">{formData.prazoIdeal || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Destinos */}
        {activeTab === 'destinos' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ranking de Destinos por Compatibilidade</h3>
            {topCountries.map((country, index) => (
              <div key={country.key} className={`bg-white rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                <div className="p-4 cursor-pointer" onClick={() => setExpandedCountry(expandedCountry === index ? null : index)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                      }`}>{index + 1}</span>
                      <span className="text-3xl ml-3">{country.info?.bandeira}</span>
                      <div className="ml-3">
                        <h4 className="font-bold text-lg text-gray-800">{country.info?.nome}</h4>
                        <p className="text-sm text-gray-500">{country.info?.capital} • {country.info?.idioma}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <div className="text-2xl font-bold text-gray-800">{country.total}%</div>
                        <div className="text-xs text-gray-500">Compatibilidade</div>
                      </div>
                      {expandedCountry === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                    }`} style={{ width: `${country.total}%` }} />
                  </div>
                </div>
                
                {/* Detalhes expandidos */}
                {expandedCountry === index && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Informações do País</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Custo de Vida:</span> {country.info?.custoVida}</p>
                          <p><span className="text-gray-500">Qualidade de Vida:</span> {country.info?.qualidadeVida}</p>
                          <p><span className="text-gray-500">Segurança:</span> {country.info?.seguranca}</p>
                          <p><span className="text-gray-500">Clima:</span> {country.info?.clima}</p>
                          <p><span className="text-gray-500">Comunidade BR:</span> {country.info?.comunidadeBR}</p>
                          <p><span className="text-gray-500">Cidadania:</span> {country.info?.tempoResidencia}</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Breakdown do Score</h5>
                        <div className="space-y-2">
                          {[
                            { label: 'Viabilidade', value: country.viabilidade, peso: '35%' },
                            { label: 'Alinhamento', value: country.alinhamento, peso: '25%' },
                            { label: 'Timeline', value: country.timeline, peso: '15%' },
                            { label: 'Custo-Benefício', value: country.custoBeneficio, peso: '15%' },
                            { label: 'Potencial LP', value: country.potencial, peso: '10%' }
                          ].map(item => (
                            <div key={item.label} className="flex items-center text-sm">
                              <span className="w-24 text-gray-600">{item.label}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(item.value, 100)}%` }} />
                              </div>
                              <span className="w-12 text-right text-gray-500">{item.peso}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Principais Cidades</h5>
                      <div className="flex flex-wrap gap-2">
                        {country.info?.cidades?.map(cidade => (
                          <span key={cidade} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                            {cidade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Rotas */}
        {activeTab === 'rotas' && (
          <div className="space-y-6">
            {topCountries.slice(0, 3).map((country) => {
              const routes = getBestRoutes(country.key, scores);
              return (
                <div key={country.key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gray-800 p-4 text-white flex items-center">
                    <span className="text-2xl mr-2">{country.info?.bandeira}</span>
                    <h4 className="font-bold">{country.info?.nome}</h4>
                    <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">{country.total}%</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {routes.length > 0 ? routes.map((route, idx) => (
                      <div key={route.key} className="border rounded-lg overflow-hidden">
                        <div className="p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => setExpandedRoute(expandedRoute === `${country.key}-${route.key}` ? null : `${country.key}-${route.key}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                idx === 0 ? 'bg-green-500' : 'bg-gray-400'
                              }`}>{idx + 1}</span>
                              <div className="ml-3">
                                <h5 className="font-semibold">{route.nome}</h5>
                                <p className="text-xs text-gray-500">{route.tipo}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{route.score}%</div>
                              <div className="text-xs text-gray-500">{route.timeline}</div>
                            </div>
                          </div>
                        </div>
                        {expandedRoute === `${country.key}-${route.key}` && (
                          <div className="border-t p-4 bg-gray-50">
                            <p className="text-gray-600 mb-4">{route.descricao}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h6 className="font-medium mb-2">Requisitos</h6>
                                <ul className="text-sm space-y-1">
                                  {route.requisitos?.map((req, i) => (
                                    <li key={i} className="flex items-start">
                                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />{req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm"><strong>Custo:</strong> {route.custoEstimado}</p>
                                <p className="text-sm"><strong>Taxa de Sucesso:</strong> {route.taxaSucesso}</p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  <div className="bg-green-50 p-2 rounded text-xs">
                                    <strong className="text-green-800">Vantagens:</strong>
                                    <ul className="text-green-700 mt-1">
                                      {route.vantagens?.slice(0, 2).map((v, i) => <li key={i}>• {v}</li>)}
                                    </ul>
                                  </div>
                                  <div className="bg-red-50 p-2 rounded text-xs">
                                    <strong className="text-red-800">Desvantagens:</strong>
                                    <ul className="text-red-700 mt-1">
                                      {route.desvantagens?.slice(0, 2).map((d, i) => <li key={i}>• {d}</li>)}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )) : <p className="text-gray-500 text-center py-4">Consulte um especialista.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Comparativo */}
        {activeTab === 'comparativo' && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-4 text-left">Critério</th>
                  {topCountries.slice(0, 4).map((c) => (
                    <th key={c.key} className="p-4 text-center">
                      <span className="text-2xl block">{c.info?.bandeira}</span>
                      {c.info?.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { label: 'Score Total', key: 'total', suffix: '%' },
                  { label: 'Viabilidade', key: 'viabilidade' },
                  { label: 'Alinhamento', key: 'alinhamento' },
                  { label: 'Timeline', key: 'timeline' }
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-medium">{row.label}</td>
                    {topCountries.slice(0, 4).map((c) => (
                      <td key={c.key} className="p-4 text-center font-bold">
                        {Math.round(c[row.key])}{row.suffix || ''}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium">Cidadania</td>
                  {topCountries.slice(0, 4).map((c) => (
                    <td key={c.key} className="p-4 text-center text-sm">{c.info?.tempoResidencia}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Ações do Relatório */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-600" />
            ) : (
              <Download className="w-4 h-4 mr-2 text-gray-600" />
            )}
            <span className="text-gray-700 font-medium">Baixar PDF</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Meu Relatório Geofitting',
                  text: `Fiz minha análise migratória com a UK Consultoria! Meu destino mais compatível é ${topCountries[0]?.info?.nome} com ${topCountries[0]?.total}% de compatibilidade.`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado!');
              }
            }}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-gray-700 font-medium">Compartilhar</span>
          </button>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
          <p className="text-blue-100 mb-6">
            Este é um diagnóstico preliminar. Para uma análise completa com advogados especializados, 
            agende uma consulta com nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=Olá! Acabei de preencher o Geofitting e gostaria de agendar uma consulta. Meu nome é ${formData.nomeCompleto}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
            <button className="flex-1 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consulta
            </button>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => { setShowAnalysis(false); setCurrentSection(0); setActiveTab('resumo'); }}
            className="text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar e editar respostas
          </button>
        </div>
      </div>
    );
  };

  // Função para gerar PDF
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    // Criar conteúdo HTML para o PDF
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório Geofitting - ${formData.nomeCompleto}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.6; }
          .page { padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #2563eb; }
          .logo { font-size: 28px; font-weight: bold; color: #2563eb; }
          .subtitle { color: #6b7280; font-size: 14px; margin-top: 5px; }
          .client-info { background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
          .client-name { font-size: 20px; font-weight: bold; color: #1f2937; }
          .client-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px; font-size: 14px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 18px; font-weight: bold; color: #2563eb; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
          .country-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 15px; margin-bottom: 15px; }
          .country-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .country-name { font-size: 18px; font-weight: bold; }
          .country-score { background: #2563eb; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
          .country-score.top { background: #16a34a; }
          .country-details { font-size: 13px; color: #6b7280; }
          .breakdown { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 10px; }
          .breakdown-item { text-align: center; }
          .breakdown-label { font-size: 11px; color: #6b7280; }
          .breakdown-value { font-weight: bold; color: #1f2937; }
          .route-card { background: #f9fafb; padding: 12px; border-radius: 8px; margin-top: 10px; }
          .route-name { font-weight: bold; color: #1f2937; }
          .route-details { font-size: 12px; color: #6b7280; margin-top: 5px; }
          .cta { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-top: 30px; }
          .cta-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .cta-text { font-size: 14px; opacity: 0.9; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
          .badge { display: inline-block; background: #dbeafe; color: #2563eb; padding: 3px 10px; border-radius: 15px; font-size: 12px; margin-right: 5px; }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div class="logo">🌍 GEOFITTING</div>
            <div class="subtitle">Relatório de Análise Migratória Personalizada</div>
            <div class="subtitle">UK Consultoria Migratória</div>
          </div>
          
          <div class="client-info">
            <div class="client-name">${formData.nomeCompleto || 'Cliente'}</div>
            <div class="client-details">
              <div><strong>Email:</strong> ${formData.email || 'Não informado'}</div>
              <div><strong>Telefone:</strong> ${formData.telefone || 'Não informado'}</div>
              <div><strong>Área:</strong> ${formData.areaAtuacao || 'Não informado'}</div>
              <div><strong>Experiência:</strong> ${formData.anosExperiencia || 'Não informado'}</div>
              <div><strong>Formação:</strong> ${formData.nivelFormacao || 'Não informado'}</div>
              <div><strong>Inglês:</strong> ${formData.nivelIngles || 'Não informado'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📊 Ranking de Destinos Recomendados</div>
            ${topCountries.map((country, index) => {
              const routes = getBestRoutes(country.key, scores);
              return `
                <div class="country-card">
                  <div class="country-header">
                    <div class="country-name">${country.info?.bandeira || ''} #${index + 1} ${country.info?.nome || country.key}</div>
                    <div class="country-score ${index === 0 ? 'top' : ''}">${country.total}%</div>
                  </div>
                  <div class="country-details">
                    <strong>Capital:</strong> ${country.info?.capital || 'N/A'} | 
                    <strong>Idioma:</strong> ${country.info?.idioma || 'N/A'} | 
                    <strong>Cidadania:</strong> ${country.info?.tempoResidencia || 'N/A'}
                  </div>
                  <div class="breakdown">
                    <div class="breakdown-item"><div class="breakdown-label">Viabilidade</div><div class="breakdown-value">${Math.round(country.viabilidade)}</div></div>
                    <div class="breakdown-item"><div class="breakdown-label">Alinhamento</div><div class="breakdown-value">${Math.round(country.alinhamento)}</div></div>
                    <div class="breakdown-item"><div class="breakdown-label">Timeline</div><div class="breakdown-value">${Math.round(country.timeline)}</div></div>
                    <div class="breakdown-item"><div class="breakdown-label">Custo-Ben.</div><div class="breakdown-value">${Math.round(country.custoBeneficio)}</div></div>
                    <div class="breakdown-item"><div class="breakdown-label">Potencial</div><div class="breakdown-value">${Math.round(country.potencial)}</div></div>
                  </div>
                  ${routes.length > 0 ? `
                    <div class="route-card">
                      <div class="route-name">🛫 Rota Recomendada: ${routes[0].nome}</div>
                      <div class="route-details">
                        <strong>Tipo:</strong> ${routes[0].tipo} | 
                        <strong>Timeline:</strong> ${routes[0].timeline} | 
                        <strong>Custo:</strong> ${routes[0].custoEstimado}
                      </div>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div class="cta">
            <div class="cta-title">📞 Próximo Passo: Consulta Personalizada</div>
            <div class="cta-text">
              Este relatório é um diagnóstico preliminar baseado nas suas respostas.<br>
              Para uma análise completa com advogados especializados e plano de ação detalhado,<br>
              agende uma consulta com nossa equipe.
            </div>
          </div>

          <div class="footer">
            <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
            <p>UK Consultoria Migratória | www.ukconsultoria.com.br</p>
            <p style="margin-top: 10px; font-size: 11px;">Este documento é confidencial e de uso exclusivo do destinatário.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Criar blob e download
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Abrir em nova janela para impressão/salvar como PDF
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
    
    setIsGeneratingPDF(false);
  };

  // Landing Page
  const renderLanding = () => (
    <>
      <Head>
        <title>Geofitting | Descubra Seu Destino Ideal | UK Consultoria Migratória</title>
        <meta name="description" content="Análise personalizada de rotas migratórias. Descubra qual país e visto são ideais para seu perfil em apenas 10 minutos." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute top-60 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            {/* Logo */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-blue-400 text-sm font-medium">UK Consultoria Migratória</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  GEOFITTING
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-2">
                Seu Mapa Migratório Personalizado
              </p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Descubra qual país, cidade e rota migratória são ideais para você e sua família
              </p>
            </div>

            {/* Main CTA Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Análise Completa em 10 Minutos
                  </h2>
                  <p className="text-gray-300">
                    Responda nosso questionário e receba um relatório detalhado com os melhores destinos e rotas para seu perfil
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">22 Países</p>
                      <p className="text-gray-400 text-xs">Analisados</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Plane className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">70+ Rotas</p>
                      <p className="text-gray-400 text-xs">Migratórias</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Relatório</p>
                      <p className="text-gray-400 text-xs">Personalizado</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowLanding(false)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
                >
                  Começar Minha Análise Gratuita
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  ⏱️ Tempo estimado: 8-10 minutos • 🔒 Suas informações são confidenciais
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center text-gray-400">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">+500 Análises Realizadas</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Award className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-sm">Especialistas em Imigração</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white/5 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Como Funciona
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: 'Responda', desc: 'Preencha o questionário com seu perfil' },
                { icon: Sparkles, title: 'Análise', desc: 'Nossa IA analisa seus dados' },
                { icon: MapPin, title: 'Resultado', desc: 'Receba o ranking de destinos' },
                { icon: Calendar, title: 'Consulta', desc: 'Agende com nossos especialistas' }
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                      <step.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Lucas M.', country: '🇵🇹 Portugal', text: 'O Geofitting me mostrou que Portugal era ideal pro meu perfil de TI. Em 4 meses já estava em Lisboa!' },
                { name: 'Fernanda S.', country: '🇩🇪 Alemanha', text: 'Não sabia que existia a Blue Card. A análise me abriu os olhos pra essa possibilidade.' },
                { name: 'Ricardo P.', country: '🇨🇦 Canadá', text: 'Achei que EUA era minha única opção, mas o Canadá se mostrou muito mais viável pro meu caso.' }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Descobrir Seu Destino?
            </h3>
            <p className="text-gray-400 mb-8">
              Milhares de brasileiros já realizaram o sonho de morar no exterior. Você pode ser o próximo.
            </p>
            <button
              onClick={() => setShowLanding(false)}
              className="py-4 px-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 inline-flex items-center group"
            >
              Começar Agora — É Grátis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 UK Consultoria Migratória. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Mostrar Landing Page primeiro
  if (showLanding) {
    return renderLanding();
  }

  // Loading durante submissão
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisando seu perfil...</h2>
          <p className="text-gray-600">Estamos processando suas respostas</p>
        </div>
      </div>
    );
  }

  // Render principal
  if (showAnalysis) {
    return (
      <>
        <Head>
          <title>Seu Relatório Geofitting | UK Consultoria Migratória</title>
          <meta name="description" content="Relatório personalizado de análise migratória" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">GEOFITTING</h1>
              <p className="text-sm text-gray-500">UK Consultoria Migratória</p>
            </div>
            {renderAnalysis()}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Geofitting | Seu Mapa Migratório | UK Consultoria</title>
        <meta name="description" content="Descubra o melhor destino e rota migratória para seu perfil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">GEOFITTING</h1>
            <p className="text-gray-600">Seu Mapa Migratório Personalizado</p>
            <p className="text-sm text-gray-500 mt-2">UK Consultoria Migratória</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Seção {currentSection + 1} de {sections.length}</span>
              <span>{Math.round(((currentSection + 1) / sections.length) * 100)}% completo</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button key={index} onClick={() => setCurrentSection(index)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs transition-all ${
                    index === currentSection ? 'bg-blue-600 text-white'
                      : index < currentSection ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                  <Icon className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">{section.title}</span>
                  <span className="md:hidden">{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              {React.createElement(sections[currentSection].icon, { className: "w-6 h-6 text-blue-600 mr-3" })}
              <h2 className="text-xl font-semibold text-gray-800">{sections[currentSection].title}</h2>
            </div>

            {renderSection()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button onClick={prevSection} disabled={currentSection === 0}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                  currentSection === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <ChevronLeft className="w-5 h-5 mr-1" />Anterior
              </button>
              <button onClick={nextSection}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {currentSection === sections.length - 1 ? (
                  <><CheckCircle2 className="w-5 h-5 mr-1" />Gerar Análise</>
                ) : (
                  <>Próximo<ChevronRight className="w-5 h-5 ml-1" /></>
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Suas informações são confidenciais e protegidas.</p>
            <p className="mt-1">© 2026 UK Consultoria Migratória</p>
          </div>
        </div>
      </div>
    </>
  );
}
