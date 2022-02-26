/* eslint-disable indent */
const tree = {
    value: 'Atividades Complementares',
    children: [{
            value: 'Grupo I',
            children: [{
                    value: 'Bolsa PID ou PAIP',
                    children: [
                        { value: 'Até 96h no curso', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado emitido pela PROGRAD', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Bolsa de Extensão',
                    children: [
                        { value: 'Até 96h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração emitida pelo órgão provedor da bolsa', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Participação em docência no ensino fundamental e médio',
                    children: [
                        { value: 'Até 64h no curso', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do empregador (com CNPJ) ou carteira de trabalho', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Iniciação científica/PET',
                    children: [
                        { title: 'Limite de Aproveitamento', value: 'Até 96h no curso' },
                        { title: 'Documentos Comprobatórios', value: 'Declaração da coordenação do projeto' }
                    ]
                },
                {
                    value: 'Projeto Social',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração da coordenação do projeto', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Curso de extensão (exceto curso de línguas nas Casas de Cultura)',
                    children: [
                        { value: 'Até 64h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da entidade organizadora', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Atividades de extensão oferecidas por outras instituições',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da entidade organizadora', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Grupo de Estudo/ Aprendizagem cooperativa',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do prof. orientador e/ou certificado emitidos pela PROGRAD', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Participação em Projeto de Pesquisa',
                    children: [
                        { value: 'Até 20h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do prof. responsável pelo projeto', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Monitoria voluntária não cadastrada na Prograd',
                    children: [
                        { value: 'Até 36h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do prof. responsável pela disciplina', title: 'Documentos Comprobatórios' }
                    ]
                }
            ]
        },
        {
            value: 'Grupo II',
            children: [{
                    value: 'Exposição',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Ticket de exposição', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Visita ao Museu',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Ticket do museu', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Peça de teatro',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Ticket do teatro', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Recital',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Ticket do evento', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Cine cultural',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Ticket do cinema', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Campeonatos Esportivos',
                    children: [
                        { value: 'Até 4h', title: 'Limite de Aproveitamento' },
                        { value: 'Comprovante de participação', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Produção cultural (curtas,musicais, peças teatrais etc.)',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Comprovante de participação', title: 'Documentos Comprobatórios' }
                    ]
                }

            ]
        },
        {
            value: 'Grupo III',
            children: [{
                    value: 'Palestras e/ou mini-cursos(incluindo extensão)específicos da área de atuação do curso ministrados',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da organização do evento', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Palestras e/ou mini-cursos específicos da área de atuação do curso participação',
                    children: [
                        { value: 'Até 24h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da organização do evento', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Participações em eventos',
                    children: [
                        { value: 'Até 20 horas por evento, limitado a 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da organização do evento', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Organização de Palestras e Eventos',
                    children: [
                        { value: 'Até 32h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado / declaração', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Apresentação de trabalhos em eventos acadêmicos/científicos(incluindo apresentações não obrigatórias nos EU)',
                    children: [
                        { value: 'Até 4h por trabalho, limitadoa 12h totais', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado emitido pela organização do evento', title: 'Documentos Comprobatórios' }
                    ]
                }
            ]
        },
        {
            value: 'Grupo IV',
            children: [{
                    value: 'Curso de aperfeiçoamento técnico',
                    children: [
                        { value: 'Até 20h por curso, limitado a 40h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado ou declaração da entidade organizadora', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Certificação específica',
                    children: [
                        { value: 'Até 40h por módulo, limitado a 64 horas', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado emitido pela empresa', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Visita técnica externa',
                    children: [
                        { value: 'Até 12h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do professor ou responsável', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Vivência profissional – área correlata ao curso',
                    children: [
                        { value: 'Limitado a 64h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do empregador(com CNPJ) ou carteira de trabalho', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Estágio supervisionado não obrigatório',
                    children: [
                        { value: 'Limitado a 64h', title: 'Limite de Aproveitamento' },
                        { value: 'Documentação emitida pela Agência de Estágios da UFC', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Vivência profissional – outras áreas',
                    children: [
                        { value: 'Até 4h por semestre, limitado a 20h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do empregador(com CNPJ) ou carteira de trabalho', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Curso de língua estrangeira',
                    children: [
                        { value: '20% da carga horária docurso de língua estrangeira', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Disciplinas de outros cursosou instituições de ens. superior',
                    children: [
                        { value: 'Até 20h por disciplina', title: 'Limite de Aproveitamento' },
                        { value: 'Histórico escolar ou declaração do professor', title: 'Documentos Comprobatórios' }
                    ]
                }
            ]
        },
        {
            value: 'Grupo V',
            children: [{
                    value: 'Publicação de trabalhos científicos - completo',
                    children: [
                        { value: 'Até 48h por trabalho, limitado a 96h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado emitido pela organização do evento ou revista', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Publicação de trabalhos científicos – resumo (exceto E.U. da UFC)',
                    children: [
                        { value: 'Até 20h por trabalho, limitado a 60h', title: 'Limite de Aproveitamento' },
                        { value: 'Certificado emitido pela organização do evento', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Monografia publicada em outro curso',
                    children: [
                        { value: 'Até 20h', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração do prof. orientador ou coordenaçãodo curso correspondente', title: 'Documentos Comprobatórios' }
                    ]
                },
                {
                    value: 'Projeto de desenvolvimento de produto',
                    children: [
                        { value: 'Até 32h por projeto, limitado a 3 projetos', title: 'Limite de Aproveitamento' },
                        { value: 'Declaração de prof. ou empregador', title: 'Documentos Comprobatórios' }
                    ]
                }
            ]
        },
        {
            value: 'Grupo VI',
            children: [{
                value: 'Vivência de Gestão (incluindo representações)',
                children: [
                    { value: 'Até 48h', title: 'Limite de Aproveitamento' },
                    { value: 'Declaração da entidade ou ata de posse com assinaturas dos presentes', title: 'Documentos Comprobatórios' }
                ]
            }]
        },
        {
            value: 'Grupo VII',
            children: [{
                value: 'Limite de Aproveitamento',
                children: [
                    { value: 'O limite máximo de acumulação de horas para este conjunto de atividades é de até 48 horas.' }
                ]
            }]
        }
    ]
}
