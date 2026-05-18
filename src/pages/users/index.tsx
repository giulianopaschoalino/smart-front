import React from 'react';
import styled from 'styled-components';
import { TextField, Button, Alert, Avatar } from '@mui/material';

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
`;

const SettingsSection = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
`;

const SectionTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: #333;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;

    & > label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
    }
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
        flex: 1;
    }
`;

interface UserSettings {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
}

const UsersSettingsPage: React.FC = () => {
    const formData: UserSettings = {
        id: '123456789',
        name: 'Usuario Demo',
        email: 'usuario.demo@smartenergia.com.br',
        profile_picture: 'https://app.energiasmart.com.br/images/210819130.png',
    };

    const passwordData = {
        currentPassword: '********',
        newPassword: '********',
        confirmPassword: '********',
    };

    return (
        <Container>
            <h1>Configurações da Conta</h1>

            <Alert severity="info" style={{ marginBottom: '1rem' }}>
                Página estática de demonstração. Os campos e botões não executam ações.
            </Alert>

            <SettingsSection>
                <SectionTitle>Informações do Perfil</SectionTitle>
                
                <AvatarContainer>
                    <Avatar src={formData.profile_picture} sx={{ width: 80, height: 80 }} />
                    <div>
                        <p style={{ margin: '0 0 0.5rem 0' }}>Foto de Perfil</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                            Faça upload de uma nova imagem para atualizar
                        </p>
                    </div>
                </AvatarContainer>

                <FormGroup>
                    <label htmlFor="name">Nome Completo</label>
                    <TextField
                        id="name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="email">Email</label>
                    <TextField
                        id="email"
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled
                    >
                        Salvar Mudanças (Mock)
                    </Button>
                </ButtonGroup>
            </SettingsSection>

            <SettingsSection>
                <SectionTitle>Alterar Senha</SectionTitle>

                <FormGroup>
                    <label htmlFor="currentPassword">Senha Atual</label>
                    <TextField
                        id="currentPassword"
                        fullWidth
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="newPassword">Nova Senha</label>
                    <TextField
                        id="newPassword"
                        fullWidth
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <TextField
                        id="confirmPassword"
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled
                    >
                        Alterar Senha (Mock)
                    </Button>
                </ButtonGroup>
            </SettingsSection>
        </Container>
    );
};

export default UsersSettingsPage;